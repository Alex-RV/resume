import React, {useState, useRef, useEffect} from "react"
import styles from 'styles/Home.module.css';

export default function ContactForm() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [plane, setPlane] =useState(false)

    //   Form validation state
    const [errors, setErrors] = useState({});

    //   Setting button text on form submission
    const [buttonText, setButtonText] = useState("Submit");

    // Setting success or failure messages states
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showFailureMessage, setShowFailureMessage] = useState(false);

  // Validation check method
  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (fullname.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (subject.length <= 0) {
      tempErrors["subject"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  //   Handling form submit
  const handleSubmit = (e) => { 
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setPlane(true);
      setButtonText("Sending");
      let data = {
          fullname,
          email,
          subject,
          message,
        };
        fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then((res) => {
          console.log('Response received');
          if (res.status === 200) {
            console.log('Response succeeded!');
            setEmail('');
            setSubject('');
            setMessage('');
            setFullname('');
            setButtonText("Submit")
            setShowSuccessMessage(true);
            setShowFailureMessage(false);
            setPlane(false);
          }
          else{
            setEmail('');
            setSubject('');
            setMessage('');
            setFullname('');
            setButtonText("Submit")
            setShowSuccessMessage(false);
            setShowFailureMessage(true);
            setPlane(false);
          }
        })
    }
  }
  
      return (
          <form
          id="contactForm"
          data-aos="fade-up"
            onSubmit={handleSubmit}
            className=" flex flex-col px-8 py-8 shadow-2xl dark:shadow-transparent rounded-xl p-6 my-4 w-full bg-white dark:bg-[#18222d]">
            <h1 className="text-2xl font-bold text-[#2ea6ff] dark:text-[#2ea6ff]">
              Contact with me
            </h1>
            
  
            <label
              htmlFor="fullname" className="text-gray-500 font-light mt-8 dark:text-gray-50">
              Full name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value);
              }}
              name="fullname"
              className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 dark:text-gray-200"
            />
            {// @ts-ignore
            errors?.fullname && (
            <p className="text-red-500">Fullname cannot be empty.</p>
          )}

  
            <label
              htmlFor="email"
              className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              E-mail<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 dark:text-gray-200"
            />
            {// @ts-ignore
            errors?.email && (
            <p className="text-red-500">Email cannot be empty.</p>
          )}
  
            <label
              htmlFor="subject"
              className="text-gray-500 font-light mt-4 dark:text-gray-50"
            >
              Subject<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 dark:text-gray-200"
            />
            {// @ts-ignore
            errors?.subject && (
            <p className="text-red-500">Subject cannot be empty.</p>
          )}
           
            <label
              htmlFor="message"
              className="text-gray-500 font-light mt-4 dark:text-gray-50">
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="bg-transparent border-b py-2 pl-4 focus:outline-none focus:rounded-md focus:ring-1 ring-green-500 font-light text-gray-500 dark:text-gray-200"
            ></textarea>
            {// @ts-ignore
            errors?.message && (
            <p className="text-red-500">Message body cannot be empty.</p>
          )}
            <div className="flex flex-row items-center justify-start">
              <button
                type="submit"
                className="px-10 mt-8 py-2 bg-[#2ea6ff] text-gray-700 dark:text-gray-50 font-light rounded-md text-lg flex flex-row items-center"
              >
                {buttonText}
                {/* <svg aria-hidden="true" 
                className="w-5 h-5 text-blue-600 dark:text-blue-500" 
                focusable="false" data-prefix="fas" data-icon="paper-plane" 
                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path fill="currentColor" 
                  d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path></svg> */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                  className={`${ plane ? "animatePlane " : ""}text-black dark:text-white inline-block ml-2`}
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
                    fill="currentColor"
                  />
                </svg>
                
              </button>
            </div>
            <div className="text-left">
            {showSuccessMessage && (
              <p className="text-green-500 font-semibold text-sm my-2">
                Thankyou! Your Message has been delivered.
              </p>
            )}
            {showFailureMessage && (
              <p className="text-red-500">
                Oops! Something went wrong, please try again.
              </p>
            )}
          </div>
          </form>
      )
  }