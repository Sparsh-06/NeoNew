import Quill from "quill";
import "quill/dist/quill.snow.css";
import React, { useEffect, useRef } from "react";
import { CiRainbow } from "react-icons/ci";
import { Link } from "react-router-dom";

export const SOPWriter = () => {
    const editorRef = useRef(null);

    useEffect(() => {
        const quill = new Quill(editorRef.current, {
            theme: "snow",
        });
        return () => {
            quill.off("text-change");
            quill.off("selection-change");
            quill.off("editor-change");
        };
    }, []);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">SOP Writer</h2>
            <div className="bg-base-200 p-4 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-2">What is an SOP?</h3>
                <p className="mb-2">
                    A Statement of Purpose (SOP) is a crucial document in academic and
                    professional applications. It's an essay that outlines your academic
                    background, professional experience, research interests, and career
                    goals.
                </p>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                    Why is an SOP important?
                </h3>
                <ul className="list-disc list-inside mb-2">
                    <li>It showcases your unique qualities and experiences</li>
                    <li>
                        It demonstrates your writing skills and ability to articulate your
                        thoughts
                    </li>
                    <li>
                        It helps admissions committees or employers understand your
                        motivations and goals
                    </li>
                    <li>It can be a deciding factor in competitive applications</li>
                </ul>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                    How to write an effective SOP:
                </h3>
                <ol className="list-decimal list-inside mb-2">
                    <li>Start with a compelling introduction</li>
                    <li>Highlight your relevant academic and professional experiences</li>
                    <li>Explain your research interests or career goals</li>
                    <li>Demonstrate why you're a good fit for the program or position</li>
                    <li>
                        Conclude by tying everything together and restating your enthusiasm
                    </li>
                </ol>
                <p className="mt-4">
                    Use the editor below to craft your SOP. Remember to be concise,
                    specific, and authentic in your writing.
                </p>
            </div>
            <div className="divider">Writing Assistance</div>
            <div className="mockup-window bg-slate-300 border">
                <div
                    className="bg-base-200 flex justify-center px-4 py-16 w-full min-h-[300px]"
                    ref={editorRef}
                ></div>
            </div>
            <Link to="/dashboard/pricing">
                <div className="badge badge-outline mt-2">
                    <span className="mx-1"><CiRainbow color="#f97316"/></span> Use AI Reviews and Suggestions
                </div>
            </Link>
        </div>
    );
};