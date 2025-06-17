import React from 'react';
   import { Input } from './Input';
   import { Button } from './Button';

   interface Page {
     id: string;
     title: string;
     active: boolean;
   }

   interface FormPageProps {
     page?: Page;
   }

   const FormPage: React.FC<FormPageProps> = ({ page }) => {
     if (!page) return null;

     const renderFormContent = () => {
       switch (page.title) {
         case 'Info':
           return (
             <>
               <Input label="Full Name" placeholder="Enter your full name" />
               <Input label="Phone" placeholder="Enter your phone number" type="tel" />
             </>
           );
         case 'Details':
           return (
             <>
               <Input label="Address" placeholder="Enter your address" />
               <Input label="City" placeholder="Enter your city" />
             </>
           );
         case 'Other':
           return (
             <>
               <Input label="Occupation" placeholder="Enter your occupation" />
               <Input label="Interests" placeholder="Enter your interests" />
             </>
           );
         case 'Ending':
           return (
             <>
               <Input label="Feedback" placeholder="Enter your feedback" />
               <Button label="Submit" className='submit' onClick={() => alert('Form Submitted!')} />
             </>
           );
         default:
           return <Input label="Default Field" placeholder="Enter something" />;
       }
     };

     return (
       <div className="form-container">
         <h2>{page.title}</h2>
         {renderFormContent()}
       </div>
     );
   };

   export default FormPage;