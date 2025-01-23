import React from "react";
import Faq from "react-faq-component";
import faqbg from "../Assets/payment_bg.jpg";

const FAQ = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", import.meta.env.VITE_EMAIL_KEY);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    const data = {
        title: "",
        rows: [
            {
                title: "How do I register for the event?",
                content: (
                    <ol>
                        <li>1. Go to the <a href="signup" className="text-blue-500 hover:text-blue-600 hover:underline">Sign up page</a></li>
                        <li>2. Fill out the registration form with your details.</li>
                        <li>3. Verify your mail.</li>
                    </ol>
                ),
            },
            {
                title: "How do I log in?",
                content: (
                    <ol>
                        <li>1. Visit the <a href="signup" className="text-blue-500 hover:text-blue-600 hover:underline">Login page</a></li>
                        <li>2. Enter your registered email and password.</li>
                        <li>3. Click the <strong>Log in</strong> button to access your profile.</li>
                    </ol>
                ),
            },
            {
                title: "How do I create a team?",
                content: (
                    <ol>
                        <li>1. Navigate to <a href="event" className="text-blue-500 hover:text-blue-600 hover:underline">Event page</a></li>
                        <li>2. Navigate to Event for which you want to create a team.</li>
                        <li>3. Look for the <strong>view details</strong> button.</li>
                        <li>4. Enter a team name, then click on <strong>Create Team</strong> button.</li>
                    </ol>
                ),
            },
            {
                title: "How do I join a team?",
                content: (
                    <ol>
                        <li>1. Navigate to <a href="event" className="text-blue-500 hover:text-blue-600 hover:underline">Event page</a></li>
                        <li>2. Enter a Team Code</li>
                        <li>3. Then click on <strong>Join Team</strong> button.</li>
                    </ol>
                ),
            },
            {
                title: "How do I check in which events I registered?",
                content: (
                    <ol>
                        <li>1. Go to your <a href="profile" className="text-blue-500 hover:text-blue-600 hover:underline">Profile page</a>.</li>
                        <li>2. Look for the <strong>Events</strong> section.</li>
                        <li>3. Review the list of events you are registered for.</li>
                    </ol>
                ),
            },
            {
                title: "Where can I check the schedule for events?",
                content: (
                    <ol>
                        <li>1. Go to <a href="schedule" className="text-blue-500 hover:text-blue-600 hover:underline">Schedule page</a>.</li>
                    </ol>
                ),
            },
            {
                title: "Where can I check team code?",
                content: (
                    <ol>
                        <li>1. Go to your <a href="profile" className="text-blue-500 hover:text-blue-600 hover:underline">Profile page</a>.</li>
                        <li>2. Look for the <strong>Events</strong> section.</li>
                        <li>3. Look for the Event which <strong>Team Code</strong> you want.</li>
                    </ol>
                ),
            },
        ],
    };

    const styles = {
        titleTextColor: "#FFFFFF",
        rowTitleColor: "white",
        rowContentColor: "white",
        arrowColor: "white",
        bgColor: "transparent",
    };

    const config = {
        animate: true,
    };

    return (
        <div
            className="p-6 min-h-screen text-white"
            style={{
                backgroundImage: `url(${faqbg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            {/* FAQ Section */}
            <div
                className="max-w-5xl mx-auto p-8 rounded-xl bg-black bg-opacity-45 backdrop-blur-sm  mt-20"
            >
                <p
                    style={{ fontFamily: '"Amarante", serif' }}
                    className="text-center mx-auto my-8 w-fit text-5xl text-white"
                >
                    FAQ
                </p>
                <Faq data={data} styles={styles} config={config} />
            </div>

            {/* Contact Us Section */}
            <div
                className="max-w-5xl mx-auto p-8 rounded-xl bg-black bg-opacity-45 backdrop-blur-sm mt-8"
            >
                <p
                    style={{ fontFamily: '"Amarante", serif' }}
                    className="text-center my-8 mx-auto w-fit text-5xl text-white"
                >
                    Contact Us
                </p>
                <form className="space-y-6" onSubmit={onSubmit}>
                    <input
                        placeholder="Your name"
                        className="placeholder-white bg-transparent w-full p-3 border-b-2 border-gray-300 outline-none text-white"
                        type="text"
                        name="name"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your email"
                        name="email"
                        className="placeholder-white bg-transparent w-full p-3 border-b-2 border-gray-300 outline-none text-white"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        required
                        className="placeholder-white bg-transparent w-full p-3 border-b-2 border-gray-300 outline-none text-white"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full bg-transparent hover:bg-white hover:text-black border-2 border-white text-white p-3 rounded-lg mt-4"
                    >
                        Submit Form
                    </button>
                </form>
                <span>{result}</span>
            </div>
        </div>
    );
};

export default FAQ;
