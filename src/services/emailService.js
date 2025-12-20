import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('pbvwKuOeNeNfBQiOF'); // Your public key

export const sendEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      to_email: 'nic.angelo.idian@gmail.com' // Your email
    };

    const result = await emailjs.send(
      'service_z8qjmnv',  // Your service ID
      'template_5w2bvl8', // Your template ID
      templateParams
    );

    console.log('Email sent successfully:', result);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};
