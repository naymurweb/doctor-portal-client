import React from 'react';
import PrimaryButton from '../../../Components/PrimaryButton/PrimaryButton';
import bg from '../../../assets/images/appointment.png'

const ContactUs = () => {
    return (
        <section style={{backgroundImage:`url(${bg})`}} className='my-20 bg-cover bg-no-repeat p-14' >
            <div className='text-center my-10'>
                <h3 className='text-secondary font-semibold text-lg'>Contact Us</h3>
                <h2 className='text-4xl text-white'>Stay connected with us</h2>
            </div>

            <div className='lg:w-1/2 mx-auto'>
            <input type="text" placeholder="Email Address" className="input input-bordered w-full " /><br />
            <input type="text" placeholder="Subject" className="input input-bordered w-full my-5" /><br />
            <textarea className="textarea w-full input-bordered py-7" placeholder="Your message"></textarea>
            <div className='text-center mt-7'>
            <PrimaryButton>Submit</PrimaryButton>
            </div>
            </div>


            
        </section>
    );
};

export default ContactUs;