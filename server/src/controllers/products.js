const ProductModel = require('../models/products')

//ดึงข้อมูลสินค้าทั้งหมดเพื่อเอาไปโชว์ในหน้า Shop
const getAll = async (req,res,next) => {
  try {
    const products = await ProductModel.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
}

//ดึงข้อมูลสินค้าแค่ชิ้นเดียวตาม ID
const getById = async (req,res,next) => {
  try {
    const product = await ProductModel.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'ไม่พบสินค้าที่ต้องการ' })
    res.json(product)
  } catch (error) {
    next(error)
  }
}

//สร้างสินค้าใหม่พร้อมจัดการระบบอัปโหลดรูปภาพ
const create = async (req,res,next) => {
  try {
    const { name, price, stock } = req.body
    const image_url = req.file ? req.file.filename : 'Logo(2).png'
    const result = await ProductModel.create({ name, price, stock, image_url })
    res.json({ message: 'สร้างสินค้าสำเร็จ', data: result })
  } catch (error) {
    next(error)
  }
}

//แก้ไขสินค้าแบบยืดหยุ่น
const update = async (req,res,next) => {
  try {
    const { name, price, stock } = req.body
    const updateData = { name, price, stock }
    
    if (req.file) updateData.image_url = req.file.filename
    
    const result = await ProductModel.update(req.params.id, updateData)
    res.json({ message: 'อัปเดตสินค้าสำเร็จ', data: result })
  } catch (error) {
    next(error)
  }
}

//ลบสินค้าออกจากระบบ
const remove = async (req,res,next) => {
  try {
    const result = await ProductModel.remove(req.params.id)
    res.json({ message: 'ลบสินค้าสำเร็จ', data: result })
  } catch (error) {
    next(error)
  }
}

//ส่งออกฟังก์ชันให้ Route ใช้งาน
module.exports = { getAll, getById, create, update, remove }