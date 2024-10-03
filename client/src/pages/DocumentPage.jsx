import DocumentCard from "../DashLayout/DashboardCard.jsx";

export const DocumentManagerPage = () => {
    return (
        <div className="p-8 h-full bg-gray-50">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Document Manager</h2>

            {/* Page Description */}
            <div className="space-y-4 mb-8">
                <p className="text-gray-600 leading-relaxed">
                    The document manager is where you can upload and organize essential application materials.
                    These documents play a crucial role in the university admission process, giving admissions
                    committees a complete picture of your academic achievements, experiences, and potential.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Universities require these documents to evaluate your academic readiness, personal motivation,
                    and suitability for the programs you are applying to. By organizing and submitting these materials
                    efficiently, you can increase your chances of making a strong impression.
                </p>
                <p className="text-gray-600 leading-relaxed">
                    Below, you can upload your required documents and keep track of your submissions. Each document type
                    serves a specific purpose in your application, so make sure to review the guidelines carefully before
                    submitting them.
                </p>
            </div>

            {/* Document Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <DocumentCard
                    title="Transcripts"
                    desc="Your academic transcripts demonstrate your performance in previous coursework and are crucial for universities to assess your academic preparation."
                />
                <DocumentCard
                    title="SOP"
                    desc="A Statement of Purpose outlines your motivation, goals, and reasons for choosing the program, giving universities insight into your long-term plans."
                />
                <DocumentCard
                    title="Test Scores"
                    desc="Standardized test scores (e.g., GRE, GMAT, IELTS) help universities gauge your aptitude and readiness for rigorous academic challenges."
                />
                <DocumentCard
                    title="Letters of Recommendation"
                    desc="Letters of Recommendation from mentors or supervisors provide insight into your character, academic ability, and work ethic from a third-party perspective."
                />
                <DocumentCard
                    title="Essays"
                    desc="Essays allow you to showcase your unique voice, perspective, and critical thinking skills, helping universities understand who you are beyond your resume."
                />
                <DocumentCard
                    title="Resume or CV"
                    desc="Your resume or CV details your professional and academic accomplishments, allowing universities to evaluate your experiences and skills."
                />
            </div>
        </div>
    );
};

