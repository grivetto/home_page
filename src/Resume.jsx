import React from 'react';
import './Resume.css';

const Resume = ({ onNavigate }) => {
    return (
        <div className="resume-container glass">
            <header className="resume-header">
                <div className="header-content">
                    <h1>Sergio Grivetto</h1>
                    <p className="job-title">Technical Employee – Senior System Administrator</p>
                    <div className="contact-info">
                        <span>Turin, Italy</span>
                        <span>•</span>
                        <a href="mailto:sergio@grivetto.it">sergio@grivetto.it</a>
                        <span>•</span>
                        <a href="https://grivetto.eu" target="_blank" rel="noopener noreferrer">grivetto.eu</a>
                        <span>•</span>
                        <a href="https://www.linkedin.com/in/sgrivett/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
            </header>

            <div className="resume-content">
                <section className="resume-section">
                    <h2>Work Experience</h2>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>Technical Employee – Senior System Administrator</h3>
                            <span className="company">NPO Torino – Turin (Italy)</span>
                            <span className="dates">Nov 2013 – Present</span>
                        </div>
                        <ul className="job-details">
                            <li><strong>Enterprise Monitoring Management:</strong> Management of the monitoring infrastructure for a server farm consisting of hundreds of servers.</li>
                            <li><strong>Zabbix Environment:</strong> Installation, configuration, and maintenance of Zabbix agents in heterogeneous environments (Windows Server and Linux).</li>
                            <li><strong>Software Engineering:</strong> Compilation and creation of custom Zabbix agent builds for Linux, utilizing static library linking to ensure total portability and stability across hundreds of client systems with diverse distributions.</li>
                            <li><strong>Quality Assurance:</strong> Functional verification of monitoring systems, agent troubleshooting, and assurance of data collection service continuity.</li>
                        </ul>
                    </div>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>Career Break</h3>
                            <span className="dates">2007 – 2013</span>
                        </div>
                        <p style={{ opacity: 0.8, fontStyle: 'italic' }}>Career break due to health reasons (fully resolved).</p>
                    </div>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>System Engineer & Security Specialist</h3>
                            <span className="company">Banco Argentaria – Palma de Mallorca (Spain)</span>
                            <span className="dates">2004 – 2007</span>
                        </div>
                        <ul className="job-details">
                            <li><strong>Security & IDS:</strong> System Security Penetration Testing and consultancy on Intrusion Detection Systems (IDS Advisor).</li>
                            <li><strong>Infrastructure Projects:</strong> Complete management of the migration project for banking Intranet servers to a new secure internal DMZ.</li>
                            <li><strong>Network Security:</strong> Advanced configuration and hardening of Check Point FW-1 Firewalls.</li>
                            <li><strong>Operating Systems:</strong> Administration of high-security environments based on BSD variants (OpenBSD, NetBSD, FreeBSD).</li>
                            <li><strong>Architectural Analysis:</strong> Evaluation and implementation of security topologies, including comparative analysis between Packet Filter and Application Proxy technologies.</li>
                        </ul>
                    </div>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>System Engineer & Migration Specialist</h3>
                            <span className="company">EU Commission (CEE) – Liège (Belgium)</span>
                            <span className="dates">2002 – 2004</span>
                        </div>
                        <ul className="job-details">
                            <li><strong>Migration Project:</strong> Management of a critical migration of 124 servers from Windows NT to Samba/Linux, with direct responsibility for security, cost optimization, stability, and staff training.</li>
                            <li><strong>Network Administration:</strong> Management of complex network infrastructures (LAN, WAN, VPN) and remote administration via advanced tools (Webmin, SWAT, VNC).</li>
                            <li><strong>Monitoring & Performance:</strong> Implementation of performance monitoring systems (Netsaint, Dataflow, Ganimede).</li>
                            <li><strong>Security & Firewall:</strong> Efficiency analysis and configuration of perimeter protection systems (Check Point FW-1, Bastille, SuSE Firewall).</li>
                            <li><strong>Technological Benchmarking:</strong> Execution of in-depth comparative tests to select the best technology stack: Samba vs NT, Apache vs IIS, Sendmail vs Qmail, Squid vs Netscape Proxy.</li>
                        </ul>
                    </div>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>Senior Unix System Engineer</h3>
                            <span className="company">ITS – Turin (Consultant for Zeropiù/Fiat Group)</span>
                            <span className="dates">1999 – 2001</span>
                        </div>
                        <ul className="job-details">
                            <li><strong>Weblinea.it Project:</strong> Implementation of the system infrastructure for the FIAT Group web portal (Iplanet/Telexis project).</li>
                            <li><strong>Server & Mail Configuration:</strong> Installation and configuration of Sendmail on SUN Netra hardware architecture and Squid Proxy Server on Compaq servers.</li>
                            <li><strong>Tuning & Optimization:</strong> Hardening and performance optimization activities on Enterprise Linux distributions (SuSE and Red Hat) in a critical production environment.</li>
                        </ul>
                    </div>

                    <div className="experience-item">
                        <div className="job-meta">
                            <h3>System Engineer</h3>
                            <span className="company">Novell Italy (PR.ES) – Rivoli (Turin)</span>
                            <span className="dates">1996 – 1998</span>
                        </div>
                        <ul className="job-details">
                            <li><strong>Certification:</strong> Obtained Certified Novell Engineer (CNE) qualification.</li>
                            <li><strong>Infrastructure:</strong> Installation and maintenance of NetWare 4.0 servers.</li>
                            <li><strong>Development:</strong> Design and development of the internal corporate database (MS Access and related tools).</li>
                        </ul>
                    </div>
                </section>

                <section className="resume-section">
                    <h2>Technical Skills</h2>
                    <div className="skills-grid">
                        <span className="skill-tag">Linux/Unix (RHEL, CentOS, Debian, *BSD)</span>
                        <span className="skill-tag">Windows Server (NT 3.51 - 2022)</span>
                        <span className="skill-tag">Zabbix (Custom Builds)</span>
                        <span className="skill-tag">Nagios / HP OpenView</span>
                        <span className="skill-tag">Apache / SSL / Squid / Samba</span>
                        <span className="skill-tag">Mail Servers (Sendmail, Postfix, Qmail)</span>
                        <span className="skill-tag">High Availability (Heartbeat, OpenMosix)</span>
                        <span className="skill-tag">Bash Scripting</span>
                        <span className="skill-tag">C / Perl / PHP / SQL</span>
                    </div>
                </section>

                <section className="resume-section">
                    <h2>Education</h2>
                    <div className="education-item">
                        <h3>Diploma in Computer Science (Perito Industriale Capo Tecnico)</h3>
                        <span className="school">Amedeo Avogadro Institute, Turin</span>
                        <span className="dates">1995</span>
                    </div>
                </section>

                <section className="resume-section">
                    <h2>Languages</h2>
                    <div className="skills-grid">
                        <span className="skill-tag">Italian (Native)</span>
                        <span className="skill-tag">English (Professional)</span>
                        <span className="skill-tag">Spanish (Professional)</span>
                    </div>
                </section>

                <footer className="resume-footer" style={{ marginTop: '3rem', fontSize: '0.8rem', opacity: 0.6, textAlign: 'center' }}>
                    <p>I authorize the processing of my personal data in accordance with the GDPR (Regulation EU 2016/679).</p>
                    <div style={{ marginTop: '1rem' }}>
                        <button onClick={() => onNavigate('home')} className="btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>Back to Home</button>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Resume;
