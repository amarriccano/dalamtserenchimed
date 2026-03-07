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
    //TODO .map((i: any) => `${i.title} x${i.quantity} — ${i.price.toLocaleString()} ₮`)
    .map((i: any) => `${i.title} x${i.quantity}`)
    .join('\n')

    //TODO assign order Id
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER, // TODO change to variable changeable on admin
    subject: `New Order — ${order.customerName}`,
    text: `
        New order received!

        Order #:   '1234'
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