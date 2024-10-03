import Quill from "quill";
import "quill/dist/quill.snow.css";
import React, { useEffect, useRef } from "react";
import { CiRainbow } from "react-icons/ci";
import { Link } from "react-router-dom";

export const EssayWriting = () => {
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
            <h2 className="text-2xl font-semibold mb-4">Essay Writer</h2>
            <div className="bg-base-200 p-4 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-2">What is an Essay?</h3>
                <p className="mb-2">
                    An essay is a piece of writing that presents an argument, a narrative, or an analysis on a specific topic. It is a common assignment in academic settings and can also be used in professional contexts.
                </p>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                    Why is an Essay important?
                </h3>
                <ul className="list-disc list-inside mb-2">
                    <li>It helps develop critical thinking and writing skills</li>
                    <li>It allows you to articulate your thoughts and arguments clearly</li>
                    <li>It demonstrates your understanding of a topic</li>
                    <li>It can be a key component in academic and professional evaluations</li>
                </ul>
                <h3 className="text-xl font-semibold mt-4 mb-2">
                    How to write an effective Essay:
                </h3>
                <ol className="list-decimal list-inside mb-2">
                    <li>Start with a strong thesis statement</li>
                    <li>Organize your ideas logically</li>
                    <li>Support your arguments with evidence and examples</li>
                    <li>Use clear and concise language</li>
                    <li>Conclude by summarizing your main points and restating the thesis</li>
                </ol>
                <p className="mt-4">
                    Use the editor below to craft your essay. Remember to be clear, concise, and well-organized in your writing.
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