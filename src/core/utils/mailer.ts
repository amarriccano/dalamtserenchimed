import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

export async function sendOrderNotification(order: any) {
  const itemsList = order.items
    .map((i: any) => `${i.title} x${i.quantity} — ${i.price.toLocaleString()} ₮`)
    .join('\n')

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER, // sends to yourself
    subject: `New Order #${order.orderNumber} — ${order.customerName}`,
    text: `
New order received!

Order #:   ${order.orderNumber}
Customer:  ${order.customerName}
Phone:     ${order.phone}
Address:   ${order.address}
${order.notes ? `Notes:     ${order.notes}` : ''}

Items:
${itemsList}

Total: ${order.total.toLocaleString()} ₮
    `.trim(),
  })
}