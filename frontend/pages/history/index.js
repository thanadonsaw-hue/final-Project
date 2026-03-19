const user = JSON.parse(localStorage.getItem('user'))
let orderToCancel = null
let globalOrders = []

window.onload = () => {
    updateUI()
    loadOrders()

    const loginPassInput = document.getElementById('login-password')
    if (loginPassInput) {
        loginPassInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') modalLogin()
        })
    }

    const regLastnameInput = document.getElementById('reg-lastname')
    if (regLastnameInput) {
        regLastnameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') modalRegister()
        })
    }

    window.onclick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            closeModal(event.target.id)
        }
        if (!event.target.closest('.user-menu-container') && !event.target.closest('.modal-overlay')) {
            const dropdowns = document.getElementsByClassName('dropdown-content')
            for (let d of dropdowns) { d.classList.remove('show') }
        }
    }
}

const toggleMenu = () => {
    const dropdown = document.getElementById('myDropdown')
    if (dropdown) dropdown.classList.toggle('show')
}

const logout = () => {
    localStorage.clear()
    location.href = '../../index.html'
}

const updateUI = () => {
    const section = document.getElementById('auth-section')
    if (user) {
        section.innerHTML = `
        <div class="user-menu-container">
            <button onclick="toggleMenu()" class="icon-btn">
                <i class="fa-solid fa-circle-user"></i>
            </button>
            <div id="myDropdown" class="dropdown-content">
                <div style="padding: 10px 20px; font-size: 12px; color: #999; border-bottom: 1px solid #f3f4f6;">
                    ผู้ใช้: ${user.username}
                </div>
                ${user.role === 'admin' ? '<a href="../admin/index.html">หน้าแอดมิน</a>' : ''}
                <a href="index.html">ประวัติการสั่งซื้อ</a>
                <button onclick="logout()" class="logout-btn" style="color: #ef4444;">ออกจากระบบ</button>
            </div>
        </div>`
    } else {
        section.innerHTML = '<button class="icon-btn" onclick="openModal(\'loginModal\')"><i class="fa-regular fa-circle-user"></i></button>'
        openModal('loginModal')
        document.getElementById('order-list').innerHTML = '<p style="text-align:center; color:#888; padding: 40px; background: white; border-radius: 12px; width: 100%; max-width: 850px; margin: 0 auto; border: 1px dashed #d1d5db;">กรุณาเข้าสู่ระบบเพื่อดูประวัติการสั่งซื้อ</p>'
    }
}

const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        if(modalId !== 'detailsModal') clearAlerts();
    }
}

const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => { 
            modal.style.display = 'none'; 
        }, 150);
    }
}

const switchModal = (closeId, openId) => {
    closeModal(closeId)
    setTimeout(() => { openModal(openId) }, 150)
}

const clearAlerts = () => {
    const loginAlert = document.getElementById('login-alert');
    const regAlert = document.getElementById('reg-alert');
    if(loginAlert) loginAlert.style.display = 'none';
    if(regAlert) regAlert.style.display = 'none';
}

const togglePassword = (inputId, iconId) => {
    const input = document.getElementById(inputId)
    const icon = document.getElementById(iconId)
    if (input.type === 'password') {
        input.type = 'text'
        icon.classList.remove('fa-eye')
        icon.classList.add('fa-eye-slash')
    } else {
        input.type = 'password'
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
    }
}

const modalLogin = async () => {
    const username = document.getElementById('login-username').value
    const password = document.getElementById('login-password').value
    const alertBox = document.getElementById('login-alert')
    alertBox.style.display = 'none'

    if (!username || !password) {
        alertBox.innerText = 'กรุณากรอกข้อมูลให้ครบถ้วน'
        alertBox.className = 'alert-box error'
        alertBox.style.display = 'block'
        return
    }

    try {
        const res = await api.auth.login({ username, password })
        if (res.data && res.data.user) {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            location.reload()
        }
    } catch (error) {
        alertBox.innerText = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
        alertBox.className = 'alert-box error'
        alertBox.style.display = 'block'
    }
}

const modalRegister = async () => {
    const username = document.getElementById('reg-username').value
    const password = document.getElementById('reg-password').value
    const firstname = document.getElementById('reg-firstname').value
    const lastname = document.getElementById('reg-lastname').value
    const alertBox = document.getElementById('reg-alert')
    alertBox.style.display = 'none'

    if (!username || !password || !firstname || !lastname) {
        alertBox.innerText = 'กรุณากรอกข้อมูลให้ครบถ้วน'
        alertBox.className = 'alert-box error'
        alertBox.style.display = 'block'
        return
    }

    try {
        const res = await api.auth.register({ username, password, firstname, lastname })
        if (res.data.success) {
            alertBox.innerText = 'สมัครสมาชิกสำเร็จ! กำลังสลับไปหน้าเข้าสู่ระบบ...'
            alertBox.className = 'alert-box success'
            alertBox.style.display = 'block'
            setTimeout(() => { switchModal('registerModal', 'loginModal') }, 2000)
        }
    } catch (error) {
        alertBox.innerText = (error.response?.data?.error || 'เกิดข้อผิดพลาดในการสมัครสมาชิก')
        alertBox.className = 'alert-box error'
        alertBox.style.display = 'block'
    }
}

const loadOrders = async () => {
    if (!user) return
    try {
        const res = await api.orders.getByUserId(user.id)
        const orders = res.data
        
        if (orders.length === 0) {
            document.getElementById('order-list').innerHTML = '<p style="text-align:center; color:#888; padding: 40px; background: white; border-radius: 12px; width: 100%; max-width: 850px; margin: 0 auto; border: 1px dashed #d1d5db;">ยังไม่มีประวัติการสั่งซื้อครับ ลองไปดูสินค้าหน้าร้านค้าสิ!</p>'
            return
        }

        const ordersWithItems = await Promise.all(orders.map(async (order) => {
            try {
                let itemsRes;
                if (api.orders.getItems) {
                    itemsRes = await api.orders.getItems(order.id)
                } else {
                    itemsRes = await axios.get(`http://localhost:8000/orders/${order.id}/items`)
                }
                return { ...order, items: itemsRes.data }
            } catch (err) {
                console.error(err)
                return { ...order, items: [] }
            }
        }))

        globalOrders = ordersWithItems;

        document.getElementById('order-list').innerHTML = ordersWithItems.map(order => {
            const date = new Date(order.created_at).toLocaleString('th-TH')
            let statusColor = '#f59e0b'
            let statusText = 'รอดำเนินการ'
            let cancelButton = ''
            
            if (order.status === 'shipped') { 
                statusColor = '#3b82f6'; statusText = 'จัดส่งแล้ว' 
            } else if (order.status === 'completed') { 
                statusColor = '#10b981'; statusText = 'สำเร็จ' 
            } else if (order.status === 'cancelled') { 
                statusColor = '#ef4444'; statusText = 'ยกเลิก' 
            } 
            
            if (order.status === 'pending') {
                cancelButton = `<button class="btn-action" onclick="confirmCancelOrder(${order.id})" style="padding: 10px 18px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;">ยกเลิกคำสั่งซื้อ</button>`
            }

            return `
            <div class="order-card" style="width: 100%; max-width: 850px; margin: 0 auto 24px auto; background: white; border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #f3f4f6;">
                <div style="padding: 24px; display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center; border-left: 6px solid ${statusColor};">
                    
                    <div style="text-align: left;">
                        <div style="font-weight: 700; color: #111827; font-size: 16px; margin-bottom: 8px;">
                            รหัสคำสั่งซื้อ: <span style="color: #6b7280; font-weight: 500;">#ORD-${order.id.toString().padStart(4, '0')}</span>
                        </div>
                        <div style="font-size: 14px; color: #6b7280; margin-bottom: 12px;">
                            <i class="fa-regular fa-calendar" style="margin-right: 6px;"></i>สั่งซื้อเมื่อ: ${date}
                        </div>
                        <div style="font-size: 14px; font-weight: 600;">
                            สถานะ: <span style="color: ${statusColor}; background: ${statusColor}15; padding: 6px 12px; border-radius: 20px; display: inline-flex; align-items: center;"><i class="fa-solid fa-circle" style="font-size: 8px; margin-right: 6px;"></i>${statusText}</span>
                        </div>
                    </div>
                    
                    <div style="text-align: right;">
                        <div style="margin-bottom: 16px;">
                            <div style="font-size: 13px; color: #6b7280; margin-bottom: 4px;">ยอดชำระสุทธิ</div>
                            <div style="font-weight: 800; color: #ee4d2d; font-size: 24px; line-height: 1;">${Number(order.total_price).toLocaleString()} <span style="font-size: 14px; font-weight: 600; color: #9ca3af;">THB</span></div>
                        </div>
                        <div style="display: flex; gap: 10px; justify-content: flex-end;">
                            <button class="btn-action" onclick="showOrderDetailsModal(${order.id})" style="padding: 10px 18px; background: white; color: #374151; border: 1px solid #d1d5db; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">ดูรายละเอียด</button>
                            ${cancelButton}
                        </div>
                    </div>

                </div>
            </div>`
        }).join('')
    } catch (error) {
        console.error(error)
        document.getElementById('order-list').innerHTML = '<p style="color:#ef4444; text-align:center; padding: 40px; background: white; border-radius: 12px; width: 100%; max-width: 850px; margin: 0 auto; border: 1px dashed #d1d5db;">เกิดข้อผิดพลาดในการดึงข้อมูล</p>'
    }
}

const showOrderDetailsModal = (id) => {
    const order = globalOrders.find(o => o.id === id);
    if (!order) return;

    const contentHtml = order.items.map((item, index) => {
        const imgSrc = (item.image_url && item.image_url !== 'Logo(2).png') 
            ? `http://localhost:8000/uploads/${item.image_url}` 
            : '../../assets/images/Logo(2).png'
        
        const borderBottom = index === order.items.length - 1 ? '' : 'border-bottom: 1px solid #f3f4f6;'
        
        return `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 0; ${borderBottom}">
            <div style="display: flex; align-items: center; gap: 16px;">
                <div style="width: 60px; height: 60px; background: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb; display: flex; justify-content: center; align-items: center; padding: 5px;">
                    <img src="${imgSrc}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
                <div style="text-align: left;">
                    <div style="font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 6px; line-height: 1.3;">${item.name}</div>
                    <div style="font-size: 13px; color: #6b7280; font-weight: 500;">
                        ${item.quantity} ชิ้น <span style="margin: 0 6px; color: #d1d5db;">|</span> <span style="color: #9ca3af;">${Number(item.price).toLocaleString()} THB</span>
                    </div>
                </div>
            </div>
            <div style="font-weight: 700; color: #ee4d2d; font-size: 15px; white-space: nowrap;">
                ${(Number(item.price) * item.quantity).toLocaleString()} THB
            </div>
        </div>`
    }).join('');

    document.getElementById('details-modal-content').innerHTML = contentHtml;
    openModal('detailsModal');
}

const confirmCancelOrder = (id) => {
    orderToCancel = id
    openModal('cancelModal')
}

const closeCancelModal = () => {
    orderToCancel = null
    closeModal('cancelModal')
}

const executeCancelOrder = async () => {
    if (!orderToCancel) return
    try {
        await axios.put(`http://localhost:8000/orders/${orderToCancel}/status`, { status: 'cancelled' })
        closeCancelModal()
        loadOrders()
    } catch (error) {
        console.error(error)
        alert('เกิดข้อผิดพลาดในการยกเลิกคำสั่งซื้อ')
        closeCancelModal()
    }
}