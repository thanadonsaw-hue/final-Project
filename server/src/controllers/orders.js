//เรียกใช้ Model
const { create, findAll, findByUserId, updateStatus, findItemsByOrderId } = require('../models/orders')
const { getConnection } = require('../config/db')

//ดึงข้อมูลออเดอร์ทั้งหมด
const getAll = async (req,res,next) => {
  try {
    const orders = await findAll()
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

//ดึงออเดอร์ตาม ID ผู้ใช้
const getByUserId = async (req,res,next) => {
  try {
    const orders = await findByUserId(req.params.userId) // ดึงจาก URL
    res.json(orders)
  } catch (error) {
    next(error)
  }
}

//สร้างคำสั่งซื้อใหม่
const createOrder = async (req,res,next) => {
  try {
    const result = await create(req.body)
    res.json({ message: 'บันทึกคำสั่งซื้อสำเร็จ', data: result })
  } catch (error) {
    next(error)
  }
}

//อัปเดตสถานะและคืนสต็อกสินค้า
const updateOrderStatus = async (req,res,next) => {
  try {
    const { status } = req.body
    const orderId = req.params.id

    const db = await getConnection()

    //เช็คสถานะปัจจุบันก่อน ป้องกันการยกเลิกซ้ำซ้อน
    const [rows] = await db.query('SELECT status FROM orders WHERE id = ?', [orderId])
    
    if (rows && rows.length > 0) {
      const currentStatus = rows[0].status

      //ถ้าสั่งยกเลิกและของเดิมยังไม่ได้ยกเลิกเข้าสู่ลอจิกคืนสต็อก
      if (status === 'cancelled' && currentStatus !== 'cancelled') {
        const items = await findItemsByOrderId(orderId) 
        
        if (items && items.length > 0) {
          for (const item of items) {
            await db.query(
              'UPDATE products SET stock = stock + ? WHERE id = ?',
              [item.quantity, item.product_id]
            )
          }
        }
      }
    }

    //อัปเดตสถานะบิลของจริง
    const result = await updateStatus(orderId, status)
    res.json({ message: 'อัปเดตสถานะสำเร็จ', data: result })
  } catch (error) {
    console.error("Update Status Error:", error)
    res.status(500).json({ error: 'ไม่สามารถอัปเดตสถานะได้' })
  }
}

// ดึงรายการสินค้าในบิล
const getItems = async (req,res,next) => {
  try {
    const items = await findItemsByOrderId(req.params.id)
    res.json(items)
  } catch (error) {
    next(error)
  }
}

//ส่งออกฟังก์ชันให้ Route ใช้งาน
module.exports = { 
  getAll, 
  getByUserId, 
  create: createOrder,
  updateStatus: updateOrderStatus, 
  getItems 
}