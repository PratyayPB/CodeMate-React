import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, FileText, UsersRound } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

const ResourcesPreview = () => {
    useScrollReveal();

    return (
        <section id="resources" className="resources section reveal">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-tagline">having a hard time to find right resources?</span>
                    <h2 className="section-title">everything you <span className="accent">need,</span> all in one place</h2>
                    <p className="section-subtitle-resources">handpicked resources to help you move forward</p>
                </div>
                
                <div className="resource-grid">
                    <div className="resource-card reveal">
                        <div className="card-icon">
                            <GraduationCap size={28} strokeWidth={2} />
                        </div>
                        <h3>Higher Studies Prep</h3>
                        <p>Prepare for exams like GATE/GRE/GMAT/IELTS etc.</p>
                        <Link to="/Resources" className="card-link">View More</Link>
                    </div>
                    
                    <div className="resource-card reveal">
                        <div className="card-icon">
                            <FileText size={28} strokeWidth={2} />
                        </div>
                        <h3>Placement Prep Materials</h3>
                        <p>Learn from resources prepared by CodeMate</p>
                        <Link to="/Resources" className="card-link">View More</Link>
                    </div>
                    
                    <div className="resource-card reveal">
                        <div className="card-icon">
                            <UsersRound size={28} strokeWidth={2} />
                        </div>
                        <h3>Connect with Alumni</h3>
                        <p>Connect to our alumni in top MNC's, Premium institutes, etc.</p>
                        <Link to="/Alumni" className="card-link">View More</Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResourcesPreview;
