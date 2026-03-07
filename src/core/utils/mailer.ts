import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  family: 4,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as any)

transporter.verify((error) => {
  if (error) {
    console.error('Mailer config error:', error)
  } else {
    console.log('Mailer ready')
  }
})

export async function sendOrderNotification(order: any) {
  const itemsList = order.items
    .map((i: any) => `${i.title} x${i.quantity}`)
    //TODO add items price
    .join('\n')

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: 'amarbatsaikhan100@gmail.com',
      subject: `New Order — ${order.customerName}`,
      //TODO assign orderId
      text: `
        New order received!

        Customer:  ${order.customerName}
        Phone:     ${order.phone}
        Address:   ${order.address}
        ${order.notes ? `Notes: ${order.notes}` : ''}

        Items:
        ${itemsList}

        Total: ${order.total.toLocaleString()} ₮
      `.trim(),
    })
    console.log('Mail sent:', info.messageId)
  } catch (err) {
    console.error('sendMail error:', err)
  }
}