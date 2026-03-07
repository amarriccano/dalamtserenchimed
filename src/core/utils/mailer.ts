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
    console.log('Sending mail to:', process.env.MAIL_USER)
    console.log('Using pass:', process.env.MAIL_PASS ? 'loaded' : 'MISSING')
    //TODO assign order Id
    transporter.verify((error, success) => {
    if (error) {
        console.error('Mailer config error:', error)
    } else {
        console.log('Mailer ready')
    }
    })
    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: "amarbatsaikhan100@gmail.com", // TODO change to variable changeable on admin
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