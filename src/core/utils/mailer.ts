import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderNotification(order: any) {
  const itemsList = order.items
    .map((i: any) => `${i.title} x${i.quantity}`)
    .join('\n')

  try {
    const { data, error } = await resend.emails.send({
    //TODO order id
      from: 'onboarding@resend.dev', // works without domain verification
      to: 'amarbatsaikhan100@gmail.com',
      subject: `New Order — ${order.customerName}`,
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
    if (error) console.error('Resend error:', error)
    else console.log('Mail sent:', data?.id)
  } catch (err) {
    console.error('sendMail error:', err)
  }
}