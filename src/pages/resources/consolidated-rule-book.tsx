import Head from "next/head";
import { useEffect, useState, } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Book, ArrowRight, ChevronRight } from "lucide-react";
import InterpretationDictionary from "./consolidated-rule-book/InterpretationDictionary";


type TableOfContentsItem = {
  id: string;
  title: string;
  level: number;
  children: TableOfContentsItem[];
};

type SectionId = string;
type ExpandedSections = Record<SectionId, boolean>;

export default function ConsolidatedRuleBook() {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({});
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  // Generate table of contents from document structure
  useEffect(() => {
    const generateTableOfContents = () => {
      const sections: TableOfContentsItem[] = [];
      const allHeadings = document.querySelectorAll('h2, h3, h4');
      
      const getLevel = (id: string): number => {
        const parts = id.split('.');
        return parts.length;
      };

      const findParent = (sections: TableOfContentsItem[], parentId: string): TableOfContentsItem | null => {
        for (const section of sections) {
          if (section.id === parentId) return section;
          const found = findParent(section.children, parentId);
          if (found) return found;
        }
        return null;
      };

      allHeadings.forEach((heading) => {
        const id = heading.closest('section')?.id;
        if (!id) return;

        const title = heading.textContent ?? '';
        const level = getLevel(id);
        const item: TableOfContentsItem = { id, title, level, children: [] };

        if (level === 1) {
          sections.push(item);
        } else {
          const parentId = id.split('.').slice(0, -1).join('.');
          const parent = findParent(sections, parentId);
          if (parent) {
            parent.children.push(item);
          }
        }
      });

      setTableOfContents(sections);
    };

    // Wait for the content to be rendered
    setTimeout(generateTableOfContents, 100);
  }, []);

  // Handle scroll to section when hash changes
  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
      // Expand parent sections when navigating to a subsection
      if (hash.includes('.')) {
        const parts = hash.split('.');
        // Expand all parent sections
        parts.reduce((acc, _, index) => {
          const sectionId = parts.slice(0, index + 1).join('.');
          setExpandedSections(prev => ({ ...prev, [sectionId]: true }));
          return acc + parts[index] + '.';
        }, '');
      }
    }
  }, [router.asPath]);

  const toggleSection = (section: SectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderTableOfContents = (items: TableOfContentsItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} className={`space-y-2 ${level > 0 ? 'pl-4' : ''}`}>
        <button 
          onClick={() => toggleSection(item.id)}
          className="flex items-center w-full text-left text-sky-600 hover:text-sky-800 transition-colors group"
        >
          {item.children.length > 0 && (
            <ChevronRight 
              className={`w-4 h-4 mr-1 transition-transform group-hover:text-sky-800 ${expandedSections[item.id] ? 'transform rotate-90' : ''}`}
            />
          )}
          <a href={`#${item.id}`} className="flex-grow">{item.title}</a>
        </button>
        {expandedSections[item.id] && item.children.length > 0 && (
          <div className={`space-y-2 ${level >= 1 ? 'md:block hidden' : ''}`}>
            {renderTableOfContents(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      <Head>
        <title>Rule Book - Gold Coast Aboriginal and Torres Strait Islander Corporation</title>
        <meta name="description" content="The official rule book of Gold Coast Aboriginal and Torres Strait Islander Corporation for Community Consultation" />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-sky-900 via-sky-800 to-purple-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]">
            <div className="absolute inset-0 bg-sky-900 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_20%,black_100%)]"></div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Book className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Official Rule Book</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Rule Book
              <span className="block mt-2 text-2xl md:text-3xl">
                Gold Coast Aboriginal and Torres Strait Islander Corporation
                <span className="block mt-1 text-xl md:text-2xl">for Community Consultation</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              The comprehensive guide to our corporation&apos;s rules, procedures, and guidelines
            </motion.p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </section>

      {/* Content Section */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4 md:px-0 md:mx-0">
          <div className="flex flex-col md:flex-row md:gap-8 mx-auto">
            {/* Table of Contents */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="mb-12 p-6 bg-gray-50 rounded-xl md:sticky md:top-24 md:max-h-[calc(100vh-8rem)] md:overflow-y-auto sticky top-0 z-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
                <nav className="space-y-2">
                  {renderTableOfContents(tableOfContents)}
                </nav>
              </div>
            </div>

            {/* Content Sections */}
            <div className="prose prose-sky max-w-none">
              {/* Section 1 - Name */}
              <section id="1" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Name</h2>
                <p className="text-gray-600">
                  The name of the corporation is Gold Coast Aboriginal and Torres Strait Islander Corporation
                  for Community Consultation
                </p>
              </section>

              {/* Section 2 - Interpretation */}
              <section id="2" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Interpretation</h2>
                <p className="text-gray-600">
                  See <a href="#schedule-1">Schedule 1</a> for the meanings of terms and phrases used in this Rule Book.
                </p>
              </section>

              {/* Section 3 - Objectives */}
              <section id="3" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">3. Objectives</h2>
                <p className="text-gray-600 mb-8">
                  The objectives of the corporation are:
                </p>

                {/* Section 3.1 */}
                <section id="3.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">3.1</h3>
                  <p className="text-gray-600 mb-6">
                    To operate and maintain a gift fund to be known as &quot;The Gold Coast Aboriginal and
                    Torres Strait Islander Corporation for Community Consultation Gift Fund&quot; in
                    accordance with the requirements of the Income Tax Assessment Act 1997.
                  </p>
                  <p className="text-gray-600 mb-6">
                    To act as an agency for the Aboriginal and Torres Strait Islander (ATSI) community in
                    the capacity of a financially supportive, socially and culturally inclusive, community
                    based and welfare orientated organisation in the areas of:
                  </p>

                  {/* Subsections */}
                  <div className="space-y-8 ml-6">
                    <section id="3.1.1" className="scroll-mt-32">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">1. Health and wellbeing</h4>
                      <p className="text-gray-600">
                        To provide alternative indigenous health care to support community needs. A major
                        generational commitment to Closing the Gap concept. Work with existing ATSI health
                        services providers.
                      </p>
                    </section>

                    <section id="3.1.2" className="scroll-mt-32">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">2. Education, training and employment</h4>
                      <p className="text-gray-600">
                        Working in partnership with all stakeholder&apos;s involved in the betterment of ATSI
                        community, develop incentives program to keep young people engaged in school:
                      </p>
                      <ul className="list-disc ml-6 mt-2 text-gray-600">
                        <li>Establish learning centres for student support;</li>
                        <li>Include parents in decision-making processes and active participation in their
                            children&apos;s education.</li>
                      </ul>
                    </section>

                    <section id="3.1.3" className="scroll-mt-32">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">3. Emergency accommodation, housing</h4>
                      <p className="text-gray-600">
                        To subsidise and provide crisis, short and long term accommodation to cover the
                        needs of ATSI clients disadvantaged by racial and cultural discrimination.
                      </p>
                    </section>

                    <section id="3.1.4" className="scroll-mt-32">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">4. Tourism</h4>
                      <p className="text-gray-600">
                        Promote cultural awareness and respect for traditional values within the ATSI
                        community and the general public.
                      </p>
                    </section>

                    <section id="3.1.5" className="scroll-mt-32">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">5. Cultural consultation</h4>
                      <p className="text-gray-600">
                        Engage and consult with traditional and historical Elders to mentor,
                        validate and provide cultural competencies to the organisation&apos;s service provision.
                        To provide mainstream stakeholder&apos;s with culturally appropriate knowledge and
                        awareness.
                      </p>
                    </section>

                    <section id="3.1.6" className="scroll-mt-32">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">6. Multimedia, communication and publication</h4>
                      <p className="text-gray-600">
                        To provide through multimedia and communication a venue for cultural information
                        sharing. Establish ATSI communication strategy as a tool to empower the ATSI
                        community.
                      </p>
                    </section>

                    <section id="3.1.7" className="scroll-mt-32">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7. Community Cultural Research</h4>
                      <p className="text-gray-600">
                        ATSI service mapping of all indigenous organisations, service providers and
                        independent operators.
                      </p>
                    </section>

                    <section id="3.1.8" className="scroll-mt-32">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">8. Court and legal support</h4>
                      <p className="text-gray-600">
                        Referral and support for ATSI clients through judicial processes.
                      </p>
                    </section>

                    <section id="3.1.9" className="scroll-mt-32">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">9. Child Protection</h4>
                      <p className="text-gray-600">
                        Implement strategies to provide safe, secure environment to protect abused and at
                        risk ATSI children.
                      </p>
                    </section>

                    <section id="3.1.10" className="scroll-mt-32">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">10. Youth Support</h4>
                      <p className="text-gray-600">
                        Provide essential life skills with cultural emphasis through facilitated workshops,
                        professional consultants, and engagement of Elders structured towards empowering
                        young ATSI people to strengthen cultural identity.
                      </p>
                    </section>
                  </div>
                </section>
              </section>

              <div className="bg-sky-50 border-l-4 border-sky-500 p-4 my-8">
                <p className="text-sky-900">
                  Note: If you want to change the objectives, the corporation will need to comply with <a href="#20">rule 20</a>.
                </p>
              </div>

              {/* Section 4 - Powers */}
              <section id="4" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Powers of the corporation</h2>
                <p className="text-gray-600 mb-4">
                  Subject to the Act and these rules, the corporation has the power to do anything lawful to
                  carry out the objectives, except:
                </p>
                <ul className="list-disc ml-6 text-gray-600">
                  <li>the corporation cannot charge application fees for membership or annual membership
                    fees</li>
                </ul>
                <div className="bg-sky-50 border-l-4 border-sky-500 p-4 my-4">
                  <p className="text-sky-900">
                    Note: <a href="#10.1">rule 10.1</a> deals with powers of the directors.
                  </p>
                </div>
              </section>

              {/* Section 5 - Membership */}
              <section id="5" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Membership of the corporation</h2>
                
                <section id="5.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">5.1 Members on registration</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>A person only becomes a member when the corporation is registered, as long as
                      the registration complies with the Act.</li>
                    <li>Members names must be entered on the register of members.</li>
                  </ul>
                </section>

                <section id="5.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">5.2 Members by application</h3>
                  
                  <section id="5.2.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.2.1 How to become a member after registration</h4>
                    <p className="text-gray-600 mb-2">A person becomes a member if:</p>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>the person wants to become a member and applies in writing</li>
                      <li>the person is eligible for membership</li>
                      <li>the directors accept the application</li>
                      <li>the person&apos;s name is entered on the register of members.</li>
                    </ul>
                  </section>

                  <section id="5.2.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.2.2 Who can apply to become a member (eligibility for membership)?</h4>
                    <p className="text-gray-600 mb-2">A person who is eligible to apply for membership must be an individual who is:</p>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>at least 18 years of age</li>
                      <li>A person who is eligible to apply for membership must be an individual
                        who resides on the Gold Coast and surrounds.</li>
                      <li>A person who is eligible to apply for membership must be an individual
                        who may not be of Aboriginal or Torres Strait Islander or Aboriginal and
                        Torres Strait Islander descent, providing that the number of non-Aboriginal
                        or Torres Strait Islander members is limited to one person</li>
                    </ul>
                  </section>

                  <section id="5.2.3" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.2.3 Membership application</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>A person (the applicant) who wants to become a member must apply to
                        the corporation.</li>
                      <li>The application must be in writing.</li>
                    </ul>
                  </section>

                  <section id="5.2.4" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.2.4 Deciding membership applications</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The directors will consider and decide membership applications.</li>
                      <li>Applications will be considered and decided in the order in which they
                        are received by the corporation.</li>
                      <li>The directors must not accept an application for membership of the
                        corporation unless the applicant:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>applies according to <a href="#5.2.3">rule 5.2.3</a></li>
                          <li>meets all the eligibility for membership requirements.</li>
                        </ul>
                      </li>
                      <li>The directors must not accept an application if it results in a majority of
                        members being non-Indigenous</li>
                      <li>The directors may refuse to accept a membership application even if
                        the applicant has applied in writing and complies with all the eligibility
                        requirements.</li>
                      <li>However, they must notify the applicant in writing of the decision and
                        the reasons for it.</li>
                    </ul>
                  </section>

                  <section id="5.2.5" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.2.5 Entry on the register of members</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>If the directors accept a membership application, the applicant&apos;s name
                        must be entered on the register of members within 14 days.</li>
                      <li>However, if:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the applicant applies for membership after a notice has been
                            given for the holding of a general meeting, and</li>
                          <li>the meeting has not been held when the directors consider the
                            application,</li>
                        </ul>
                        <p className="mt-2">then the corporation must not enter the person on the register of
                        members until after the general meeting has been held.</p>
                      </li>
                    </ul>
                  </section>
                </section>

                <section id="5.3" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">5.3 Membership fees</h3>
                  <p className="text-gray-600">
                    The corporation must not impose fees for membership of the corporation
                  </p>
                </section>

                <section id="5.4" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">5.4 Members rights and obligations</h3>
                  
                  <section id="5.4.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.4.1 Members rights</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>Each member has rights under the Act and these rules including the
                        rights set out below. A member:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>can attend, speak and vote at a general meeting of the
                            corporation</li>
                          <li>can be elected or appointed as a director</li>
                          <li>cannot be removed as a member unless the directors and the
                            corporation have complied with <a href="#5.7"> rule 5.7</a></li>
                          <li>can put forward resolutions to be voted on at a general meeting of
                            the corporation in accordance with <a href="#7.6">rule 7.6</a></li>
                          <li>can ask the directors to call a general meeting of the corporation
                            in accordance with <a href="#7.3.2">rule 7.3.2</a></li>
                          <li>can access the following books and records of the corporation:
                            <ul className="list-[upper-alpha] ml-6 mt-2 space-y-2">
                              <li>the register of members, under <a href="#6.5">rule 6.5</a></li>
                              <li>the minute books, under <a href="#14.9">rule 14.9</a></li>
                              <li>the{` corporation's `}rule book, under <a href="14.11">rule 14.11</a></li>
                              <li>certain reports prepared by or for the directors and the corporation, in accordance with the Act</li>
                            </ul>
                          </li>
                          <li>can ask the directors to provide access to any other records or
                          books of the corporation in accordance with rule <a href="#14.9">14.10.</a></li>
                          <li>can have any disputes with another member or with the directors dealt with under the process in <a href="#17">rule 17.</a></li>
                        </ul>
                      </li>
                      <li>Members do not have the right to share in the profits of the corporation
or take part in the distribution of the {`corporation's`} assets if it is wound
up.</li>
                    <li>If a member believes that their rights have been breached or ignored by
the directors, the member can use the dispute resolution process in 
<a href="#17">rule 17.</a></li>
                    </ul>
                  </section>

                  <section id="5.4.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.4.2 Members&apos; responsibilities</h4>
                    <p className="text-gray-600 mb-2">Each member has the following responsibilities:</p>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>to comply with the Act and these rules.</li>
                      <li>to notify the corporation of any change in their address within 28 days</li>
                      <li>to comply with any code of conduct adopted by the corporation</li>
                      <li>to treat other members and the directors with respect and dignity</li>
                      <li>to not behave in a way that significantly interferes with the operation of
                      the corporation or of corporation meetings.</li>
                    </ul>
                  </section>

                  <section id="5.4.3" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.4.3 Liability of members</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>The members are not liable to contribute to the property of the
                        corporation on winding up.</li>
                        <li>If the application for registration of the corporation states that members
                        and former members are:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>
                                not to be liable to contribute towards the payment of the debts and
                                liabilities of the corporation, then they are not liable to contribute,
                            </li>
                            <li>
                                not to be liable to contribute towards the payment of the debts and
                                liabilities of the corporation, then they are not liable to contribute,
                            </li>
                        </ul> 
                        </li>

                    </ul>
                  </section>
                </section>

                <section id="5.5" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">5.5 How a person stops being a member</h3>
                  
                  <section id="5.5.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.5.1 A person will stop being a member if:</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>the person resigns as a member (see <a href="#5.6">rule 5.6</a>)</li>
                      <li>the person dies</li>
                      <li>the person&apos;s membership of the corporation is cancelled (see rules 
                        <a href="#5.7.1"> 5.7.1</a> to <a href="#5.7.4">5.7.4</a>)</li>
                      <li>the member is a body corporate and it ceases to exist.</li>
                    </ul>
                  </section>

                  <section id="5.5.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.5.2 When a person ceases to be a member</h4>
                    <p className="text-gray-600">
                    A person ceases to be a member when the person&apos;s name is removed
                    from the register of members as a current member of the corporation.
                    </p>
                  </section>
                </section>

                <section id="5.6" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">5.6 Resignation of member</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>A member may resign by giving a resignation notice to the corporation.</li>
                    <li>A resignation notice must be in writing.</li>
                    <li>the corporation must remove the member&apos;s name from the register of current
                      members of the corporation within 14 days after receiving the resignation notice.</li>
                  </ul>
                </section>

                <section id="5.7" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">5.7 Process for cancelling membership</h3>

                  <section id="5.7.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.7.1 Cancelling ineligible membership</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The directors may, by resolution, cancel the membership of a member
                        if the member:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>is not eligible for membership or</li>
                          <li>has ceased to be eligible for membership,</li>
                        </ul>
                      </li>
                      <li>Before cancelling the membership, the directors must give the member
                        notice in writing stating that:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the directors intend to cancel the membership for the reasons
                            specified in the notice, and</li>
                          <li>the member has 14 days to object to the cancellation of the
                            membership, and</li>
                          <li>the objection must be in writing</li>
                        </ul>
                      </li>
                      <li>If the member does not object, the directors must cancel the
                        membership.</li>
                      <li>If the member does object as set out in rule 5.7.1(b)(iii):
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the directors must not cancel the membership</li>
                          <li>only the corporation by resolution in general meeting may cancel
                            the membership.</li>
                        </ul>
                      </li>
                      <li>If a membership is cancelled, the directors must give the member a
                        copy of the resolution (being either the resolution of the directors or the
                        resolution of the general meeting) as soon as possible after it has been
                        passed.</li>
                    </ul>
                  </section>

                  <section id="5.7.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.7.2 Membership may be cancelled if member cannot be contacted</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The membership may be cancelled by special resolution in a general
                        meeting if the corporation:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>has not been able to contact that member at their address entered
                            on the register of members for a continuous period of two years
                            before the meeting and</li>
                          <li>has made two or more reasonable attempts to contact the
                            member during that 2-year period but has been unable to.</li>
                        </ul>
                      </li>
                      <li>If the corporation cancels the membership, the directors must send that
                        person a copy of the resolution at their last known address, as soon as
                        possible after the resolution has been passed.</li>
                    </ul>
                  </section>

                  <section id="5.7.3" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.7.3 Membership may be cancelled if a member is not an Aboriginal and Torres Strait Islander person</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>If <a href="#5.2.2">rule 5.2.2</a> includes an eligibility requirement that an individual be an
                        Aboriginal and Torres Strait Islander person, membership may be
                        cancelled if member is not an Aboriginal and Torres Strait Islander
                        person</li>
                      <li>The corporation, by special resolution in a general meeting, may cancel
                        the member&apos;s membership if the general meeting is satisfied that
                        member is not an Aboriginal or Torres Strait Islander person.</li>
                      <li>If the corporation cancels a person&apos;s membership under this rule, the
                        directors must give that person a copy of the resolution, as soon as
                        possible after it has been passed.</li>
                    </ul>
                  </section>

                  <section id="5.7.4" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.7.4 Membership may be cancelled if a member misbehaves</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The corporation may cancel the membership by special resolution in a
                        general meeting if the general meeting is satisfied that member has
                        behaved in a way that significantly interfered with the operation of the
                        corporation or of corporation meetings.</li>
                      <li>If the corporation cancels a membership under this rule, the directors
                        must give that person a copy of the resolution, as soon as possible
                        after it has been passed.</li>
                    </ul>
                  </section>

                  <section id="5.7.5" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">5.7.5 Amending register after a membership is cancelled</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>Within 14 days of a member&apos;s membership being cancelled, the
                        corporation must remove their name from the register of current
                        members of the corporation.</li>
                    </ul>
                  </section>
                </section>

                <section id="5.8" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">5.8 Different classes of members</h3>
                  <p className="text-gray-600">
                    The corporation does not have different classes of members.
                  </p>
                </section>

                <section id="5.9" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">5.9 Observers</h3>
                  <p className="text-gray-600">
                    The corporation does not have observers.
                  </p>
                </section>
              </section>
              
              <section id="6" className="scroll-mt-32 mt-12">
  <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Registers of members and former members</h2>

  <section id="6.1" className="scroll-mt-32 ml-6">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">6.1 Maintaining register of members</h3>
    <p className="text-gray-600">
      The corporation must set up and maintain a register of members.
    </p>
  </section>

  <section id="6.2" className="scroll-mt-32 ml-6 mt-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">6.2 Information on the register of members</h3>

    <section id="6.2.1" className="scroll-mt-32 ml-4 mt-6">
      <h4 className="text-xl font-bold text-gray-900 mb-3">6.2.1 Information about individuals</h4>
      <p className="text-gray-600 mb-4">
        The register of members must contain the following information about
        individual members:
      </p>
      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
        <li>the member&apos;s name (given and family name) and address. The register
          may also contain any other name by which the member is or was
          known.</li>
        <li>the date on which the member&apos;s name was entered on the register.</li>
      </ul>
    </section>

    <section id="6.2.2" className="scroll-mt-32 ml-4 mt-6">
      <h4 className="text-xl font-bold text-gray-900 mb-3">6.2.2 Information about bodies corporate</h4>
      <p className="text-gray-600 mb-4">The register of members must contain the following information about
        body corporate members:</p>
      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
        <li>the member&apos;s name and address</li>
        <li>the date on which the member&apos;s name was entered on the register.</li>
      </ul>
    </section>

    <section id="6.2.3" className="scroll-mt-32 ml-4 mt-6">
      <h4 className="text-xl font-bold text-gray-900 mb-3">6.2.3 Information about Indigeneity</h4>
      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
        <li>If a member is not an Aboriginal and Torres Strait Islander person, their
          entry in the register of members must say so.</li>
      </ul>
    </section>
  </section>

  <section id="6.3" className="scroll-mt-32 ml-6 mt-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">6.3 Register of former members</h3>
    <p className="text-gray-600">
      The corporation must set up and maintain a register of former members.
    </p>
  </section>

  <section id="6.4" className="scroll-mt-32 ml-6 mt-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">6.4 Information on the register of former members</h3>

    <section id="6.4.1" className="scroll-mt-32 ml-4 mt-6">
      <h4 className="text-xl font-bold text-gray-900 mb-3">6.4.1 Information about individuals</h4>
      <p className="text-gray-600 mb-4">
        The register of former members must contain the following information
        about each individual who stopped being a member within the last 7 years:
      </p>
      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
        <li>the member&apos;s name (given and family name) and address</li>
        <li>the date on which the individual stopped being a member.</li>
      </ul>
      <div className="bg-sky-50 border-l-4 border-sky-500 p-4 my-4">
        <p className="text-sky-900">
          Note: The register may also contain any other name by which the individual
          is or was known.
        </p>
      </div>
    </section>

    <section id="6.4.2" className="scroll-mt-32 ml-4 mt-6">
      <h4 className="text-xl font-bold text-gray-900 mb-3">6.4.2 Information about bodies corporate</h4>
      <p className="text-gray-600 mb-4">
        The register of former members must contain the following information
        about each body corporate that stopped being a member within the last 7
        years:
      </p>
      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
        <li>the member&apos;s name and address</li>
        <li>the date on which the body stopped being a member.</li>
      </ul>
    </section>
  </section>

  <section id="6.5" className="scroll-mt-32 ml-6 mt-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">6.5 Location and inspection of registers of members and former members</h3>
    <section id="6.5.1" className="scroll-mt-32 ml-4 mt-6">
      <h4 className="text-xl font-bold text-gray-900 mb-3">6.5.1 Location of registers</h4>
      <p className="text-gray-600 mb-4">
        The corporation must keep the register of members and the register of
        former members at:
      </p>
      <ul className="list-[lower-alpha] ml-6 mt-2 space-y-2">
        <li>the corporation&apos;s registered office if it is registered as a large
          corporation, or</li>
        <li>the corporation&apos;s document access address if it is registered as a small
          or medium corporation.</li>
      </ul>
    </section>

    <section id="6.5.2" className="scroll-mt-32 ml-4 mt-6">
      <h4 className="text-xl font-bold text-gray-900 mb-3">6.5.2 Right to inspect registers</h4>
      <p className="text-gray-600 mb-4">
        The register of members and register of former members must be open
        for inspection by any person, and any person has a right to inspect the
        registers.</p>
      <ul className="list-[lower-alpha] ml-6 mt-2 space-y-2">
        <li>The register of members and register of former members must be open
          for inspection by any person, and any person has a right to inspect the
          registers.</li>
        <li>If a register is kept on a computer, the corporation must allow the
          person to inspect a hard copy of the information on the register (unless
          the person and the corporation agree that the person can access the
          information by computer)
        </li>
      </ul>
    </section>

    <section id="6.5.3" className="scroll-mt-32 ml-4 mt-6">
      <h4 className="text-xl font-bold text-gray-900 mb-3">6.5.3 Inspection fees</h4>
      <p className="text-gray-600 mb-4">
        A member may inspect the registers without charge.
        A person who is not a member may inspect the registers only on
        payment of any fee required by the corporation.
      </p>
    </section>

    <section id="6.5.4" className="scroll-mt-32 ml-4 mt-6">
      <h4 className="text-xl font-bold text-gray-900 mb-3">6.5.4 Right to get copies</h4>
      <p className="text-gray-600 mb-4">
        The corporation must give a person a copy of the registers (or a part of
        either register) within 7 days (or such longer period as the Registrar may
        allow) if the person:
      </p>
      <ul className="list-[lower-alpha] ml-6 mt-2 space-y-2">
        <li>asks for the copy, and</li>
        <li>pays any fee (up to the prescribed amount) required by the corporation.</li>
      </ul>
    </section>
  </section>

  <section id="6.6" className="scroll-mt-32 ml-6 mt-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">6.6 Making register of members available at AGM</h3>
    <p className="text-gray-600">
      The corporation must:
    </p>
    <ul className="list-[lower-alpha] ml-6 mt-2 space-y-2">
      <li>make the register of members available for inspection (without charge) by
        members at the AGM</li>
      <li>ask each member attending the AGM to check and update their entry.</li>
    </ul>
  </section>

  <section id="6.7" className="scroll-mt-32 ml-6 mt-8">
    <h3 className="text-2xl font-bold text-gray-900 mb-4">6.7 Provision of registers to Registrar</h3>
    <p className="text-gray-600">
      If the Registrar requests a copy of the register of members, or the register of former
      members, it must be provided within 14 days or such longer period as the Registrar
      specifies.
    </p>
  </section>
</section>
              

              {/* Section 7 - Annual general meetings and general meetings */}
              <section id="7" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Annual general meetings (AGMs) and general meetings</h2>

                <section id="7.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">7.1 AGMs</h3>

                  <section id="7.1.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">7.1.1 Holding AGMs</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The corporation must hold an AGM within 5 months after the end of its financial year.</li>
                      <li>If the corporation has only 1 member, it is not required to hold an AGM.</li>
                    </ul>
                  </section>

                  <section id="7.1.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">7.1.2 Extension of time for holding AGMs</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The corporation may apply to the Registrar to extend the period within
which the corporation must hold an AGM, provided the application is
made before the end of that period.</li>
<li>If the Registrar grants an extension, the corporation must hold its AGM
within the extended period specified by the Registrar.</li>
                    </ul>
                  </section>

                  <section id="7.1.3" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">7.1.3 Business of AGM</h4>
                    <p className="text-gray-600 mb-4">The business of an AGM may include any of the following, even if not referred to in the notice of meeting:</p>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>confirmation of the minutes of the previous general meeting, except at
                      the first AGM</li>
                      <li>the consideration of the reports that under Chapter 7 of the Act are required to be presented at the AGM</li>
                      <li>the election of directors</li>
                      <li>the appointment and remuneration of the auditor (if any)</li>
                      <li>checking of the register of members (see <a href="#6.6">rule 6.6(b)</a>)</li>
                      <li>asking questions about management of the corporation and asking questions of the corporation&apos;s auditor (if any) (see <a href="#7.16"> rule 7.16</a>).</li>
                    </ul>
                  </section>
                </section>

                <section id="7.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">7.2 General meetings</h3>

                  <section id="7.2.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">7.2.1 Purpose of general meeting</h4>
                    <p className="text-gray-600">
                    The corporation must hold its first general meeting within 3 months after the
                    corporation is registered.
                    </p>
                  </section>

                  <section id="7.2.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">7.2.2 Time and place of general meeting</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>A general meeting must be held at a reasonable time and place.</li>
                      <li>If the directors change the place of a general meeting, notice of the change must be given to each person who is entitled to receive it.</li>
                    </ul>
                  </section>

                  <section id="7.2.3" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">7.2.3 Business of general meeting</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The business at each general meeting must include:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>confirmation of the minutes of the previous general meeting</li>
                          <li>all matters set out in the notice of the general meeting</li>
                        </ul>
                      </li>
                    </ul>
                  </section>
                </section>

                <section id="7.3" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">7.3 Calling general meetings</h3>

                  <section id="7.3.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">7.3.1 Director may call meetings</h4>
                    <p className="text-gray-600">
                      A director may call a general meeting of the corporation.
                    </p>
                  </section>

                  <section id="7.3.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">7.3.2 Members may request directors to call general meetings</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The directors must call and arrange to hold a general meeting on the request of at least the required number of members specified under <a href="#7.3.2">rule 7.3.2(b)</a></li>
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the number of members prescribed by the Regulations and
applicable to the corporation, or, if none is prescribed, 5
members, or</li>
                          <li>the percentage of members prescribed by the Regulations and
applicable to the corporation, or, if none is prescribed, 10% of the
members.</li>
                        </ul>
                      <li>The request must:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>be in writing</li>
                          <li>state any resolution to be proposed at the meeting</li>
                          <li>be signed by the members making the request</li>
                          <li>nominate a member to be the contact member on behalf of the members making the request</li>
                          <li>be given to the corporation.</li>
                        </ul>
                      </li>
                      <li>Separate copies of a document setting out a request under <a href="#7.3.2">rule 7.3.2(a) </a> 
may be used for signing by members if the wording of the request is
identical in each copy</li>
                    </ul>
                  </section>

                  <section id="7.3.3" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">7.3.3 Directors may apply to deny a members&apos; request to call a general meeting</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>If the directors resolve:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>that a request under <a href="#7.3.2">rule 7.3.2</a> is frivolous or unreasonable, or</li>
                          <li>that complying with a request under <a href="#7.3.2">rule 7.3.2</a> would be contrary to the interests of the members as a whole,</li>
                          <li>a director, on behalf of all of the directors, may apply to the Registrar for permission to deny the request.</li>
                        </ul>
                      </li>
                      <li>An application must:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>be in writing</li>
                          <li>set out the ground on which the application is made</li>
                          <li>be made within 21 days after the request was made.</li>
                        </ul>
                      </li>
                      <li>The directors must, as soon as possible after making an application, give the contact member (see <a href="#7.3.2">rule 7.3.2(b)(iv)</a>) notice that an application has been made.</li>
                    </ul>
                  </section>

                  <section id="7.3.4" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">7.3.4 Timing for a requested general meeting</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The directors must call the meeting within 21 days after the request was sent to them.</li>
                      <li>If:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>a director has applied to deny a request, and</li>
                          <li>the Registrar refuses that request,</li>
                          <li>the directors must call the meeting within 21 days after being notified of the Registrar&apos;s decision.</li>
                        </ul>
                      </li>
                    </ul>
                  </section>
                  </section>

                  <section id="7.4" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.4 Requirement for notice of general meeting</h3>

                    <section id="7.4.1" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.4.1 Notice for general meeting</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>At least 21 days notice must be given of a general meeting.</li>
                        <li>The corporation:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>may call an AGM on shorter notice, if all the members agree beforehand</li>
                            <li>may call any other general meeting on shorter notice, if at least 95% of the members agree beforehand.</li>
                          </ul>
                        </li>
                        <li>At least 21 days notice must be given of a general meeting at which a resolution will be moved to:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>remove a director</li>
                            <li>appoint a director in place of a director removed or</li>
                            <li>remove an auditor.</li>
                          </ul>
                        </li>
                      </ul>
                      <div className="bg-sky-50 border-l-4 border-sky-500 p-4 my-4">
                        <p className="text-sky-900">
                          Note: Shorter notice cannot be given for these kinds of meetings.
                        </p>
                      </div>
                    </section>

                    <section id="7.4.2" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.4.2 Requirement to give notice of general meeting to members, officers and observers</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>The corporation must give written notice of a general meeting to the following people:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>each member entitled to vote at the meeting</li>
                            <li>each director</li>
                            <li>the secretary (if any)</li>
                            <li>the contact officer (if any)</li>
                            <li>any observer entitled to attend the meeting.</li>
                          </ul>
                        </li>
                        <li>A notice to joint members must be given to the joint member named first in the register of members.</li>
                        <li>The corporation may give the notice of meeting to a member personally or by sending it by post, fax or other electronic means nominated by the member.</li>
                        <li>A notice of meeting:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>sent by post is taken to be received 3 days after it is posted</li>
                            <li>sent by fax, or other electronic means, is taken to have been given on the business day after it is sent.</li>
                          </ul>
                        </li>
                      </ul>
                    </section>

                    <section id="7.4.3" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.4.3 Requirement to give notice of general meeting and other communications to auditor</h4>
                      <p className="text-gray-600 mb-4">The corporation must give its auditor (if any):</p>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>notice of a general meeting in the same way that a member is entitled to receive notice</li>
                        <li>any other communications relating to the general meeting that a member is entitled to receive.</li>
                      </ul>
                    </section>

                    <section id="7.4.4" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.4.4 Contents of notice of general meeting</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>A notice of a general meeting must:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>set out the place, date and time for the meeting (and, if the meeting is to be held in 2 or more places, the technology that will be used to do this)</li>
                            <li>state the general nature of the meeting&apos;s business</li>
                            <li>if a special resolution is to be proposed at the meeting, set out an intention to propose it and state what it is</li>
                            <li>if a member is entitled to appoint a proxy, contain a statement setting out:
                              <ul className="list-[upper-alpha] ml-6 mt-2 space-y-2">
                                <li>that the member has a right to appoint a proxy</li>
                                <li>whether or not the proxy needs to be a member of the corporation</li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li>The information included in a notice of a general meeting must be worded and presented clearly and concisely.</li>
                      </ul>
                    </section>
                  </section>

                  <section id="7.5" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.5 Failure to give notice</h3>
                    <p className="text-gray-600 mb-4">A general meeting, or any proceeding at a general meeting, will not be invalid just because:</p>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>the notice of the general meeting has accidentally not been sent or</li>
                      <li>a person has not received the notice.</li>
                    </ul>
                  </section>

                  <section id="7.6" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.6 Members&apos; resolutions</h3>

                    <section id="7.6.1" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.6.1 Notice of members&apos; resolutions</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>If a member or members wish to move a resolution at a general meeting, a notice of that resolution must be given to the corporation by at least the required number of members under <a href="#7.6.1">rule 7.6.1(d)</a>.</li>
                        <li>A notice of a members&apos; resolution must:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>be in writing</li>
                            <li>set out the wording of the proposed resolution</li>
                            <li>be signed by the members proposing to move the resolution.</li>
                          </ul>
                        </li>
                        <li>Separate copies of a document setting out the notice may be used for signing by members if the wording of the notice is identical in each copy.</li>
                        <li>For the purposes of <a href="#7.6.1">rule 7.6.1(a)</a>, the required number of members is the greater of:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>the number of members prescribed by the Regulations and applicable to the corporation for the purposes of the giving of such a notice, or, if none is prescribed, 5 members, or</li>
                            <li>the percentage of members prescribed by the Regulations and applicable to the corporation for the purposes of the giving of such a notice, or, if none is prescribed, 10% of the members.</li>
                          </ul>
                        </li>
                      </ul>
                    </section>

                    <section id="7.6.2" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.6.2 Consideration of members&apos; resolutions</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>If the corporation has been given notice of a members&apos; resolution it must be considered at the next general meeting that occurs more than 28 days after the notice is given.</li>
                        <li>The corporation must give all its members notice of that resolution at the same time, or as soon as possible afterwards, and in the same way, as it gives notice of a general meeting.</li>
                        <li>The corporation does not have to give notice of a resolution if it is defamatory.</li>
                      </ul>
                    </section>

                    <section id="7.6.3" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.6.3 Members&apos; statements to be distributed</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>Members may ask the corporation to give all its members a statement about:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>a resolution that is proposed to be moved at the general meeting or</li>
                            <li>any other matter that may be considered at that general meeting.</li>
                          </ul>
                        </li>
                        <li>This request must be:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>made by at least the required number of members under <a href="#7.6.3">rule 7.6.3(f)</a></li>
                            <li>in writing</li>
                            <li>signed by the members making the request</li>
                            <li>given to the corporation.</li>
                          </ul>
                        </li>
                        <li>Separate copies of a document setting out the request may be used for signing by members if the wording of the request is identical in each copy.</li>
                        <li>After receiving a request, the corporation must distribute a copy of the statement to all its members at the same time, or as soon as possible afterwards, and in the same way, as it gives notice of the relevant general meeting.</li>
                        <li>The corporation does not have to comply with a request to distribute a statement if it is defamatory.</li>
                        <li>For the purposes of <a href="#7.6.3">rule 7.6.3(a)</a>, the required number of members for the corporation is the greater of:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>the number of members prescribed by the Regulations and applicable to the corporation for the purposes of making such a request, or, if none is prescribed, 5 members, or</li>
                            <li>the percentage of members prescribed by the Regulations and applicable to the corporation for the purposes of making such a request, or, if none is prescribed, 10% of the members.</li>
                          </ul>
                        </li>
                      </ul>
                    </section>
                  </section>

                  <section id="7.7" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.7 Quorum for general meeting</h3>

                    <section id="7.7.1" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.7.1 Quorum</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>If the corporation has 11 or more members, the quorum for a meeting of the corporation&apos;s members is the lesser of:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>10 members, or</li>
                            <li>the greater of:
                              <ul className="list-[upper-alpha] ml-6 mt-2 space-y-2">
                                <li>the number of members holding 10% of the voting rights, or</li>
                                <li>2 members.</li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li>If the corporation has 10 members or less, the quorum for a meeting of the corporation&apos;s members is 2 members.</li>
                        <li>If the corporation has 1 member, the quorum for a meeting is 1.</li>
                      </ul>
                    </section>

                    <section id="7.7.2" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.7.2 Quorum to be present</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>The quorum must be present at all times during the meeting.</li>
                        <li>In determining whether a quorum is present, individuals attending as proxies or body corporate representatives will be counted as follows:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>if a member has appointed more than 1 proxy or representative, only 1 of them will be counted, and</li>
                            <li>if an individual is attending both as a member and as a proxy or body corporate representative, counting that individual only once.</li>
                          </ul>
                        </li>
                      </ul>
                    </section>

                    <section id="7.7.3" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.7.3 Adjourned meeting where no quorum</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>A meeting of the corporation&apos;s members that does not have a quorum present within 1 hour after the time for the meeting set out in the notice is adjourned to the same time of the same day in the next week, and to the same place, unless the directors specify otherwise.</li>
                        <li>If no quorum is present at the resumed meeting within 1 hour after the time for the meeting, the meeting is dissolved.</li>
                      </ul>
                    </section>
                  </section>

                  <section id="7.8" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.8 Chairing general meeting</h3>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The directors may elect an individual to chair general meetings.</li>
                      <li>If a chair has not been elected or the chair is not available or does not want to chair the meeting, the directors must elect an individual present to chair it.</li>
                      <li>The members at a general meeting must elect a member present to chair the meeting (or part of it) if:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the directors have not already elected a chair, or</li>
                          <li>a previously elected chair is not available, or does not want to chair the meeting.</li>
                        </ul>
                      </li>
                      <li>The chair must adjourn a general meeting if the majority of members present agree or direct that the chair to do so.</li>
                    </ul>
                  </section>

                  <section id="7.9" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.9 Use of technology for general meeting</h3>
                    <p className="text-gray-600">
                      The corporation may hold a general meeting at 2 or more venues using any technology that gives the members as a whole a reasonable opportunity to participate.
                    </p>
                  </section>

                  <section id="7.10" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.10 Auditor&apos;s right to be heard at general meetings</h3>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>If the corporation has an auditor, the auditor is entitled to attend any general meeting of the corporation.</li>
                      <li>The auditor is entitled to be heard at a general meeting on any part of the business of that meeting that concerns the auditor in their professional capacity.</li>
                      <li>The auditor is entitled to be heard even if:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the auditor retires at that meeting, or</li>
                          <li>that meeting passes a resolution to remove the auditor from office.</li>
                        </ul>
                      </li>
                      <li>The auditor may authorise a person in writing as the auditor&apos;s representative for the purpose of attending and speaking at any general meeting.</li>
                    </ul>
                  </section>

                  <section id="7.11" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.11 Voting at general meetings</h3>

                    <section id="7.11.1" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.11.1 Entitlement to vote</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>At a general meeting, each member has 1 vote, both on a show of hands and a poll.</li>
                        <li>The chair has a casting vote, and also, if he or she is a member, any vote he or she has as a member.</li>
                      </ul>
                    </section>

                    <section id="7.11.2" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.11.2 Objections to right to vote</h4>
                      <p className="text-gray-600 mb-4">A challenge to a right to vote at a general meeting:</p>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>may only be made at the meeting, and</li>
                        <li>must be determined by the chair, whose decision is final.</li>
                      </ul>
                    </section>

                    <section id="7.11.3" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.11.3 How voting is carried out</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>A resolution put to the vote at a general meeting must be decided by simple majority on a show of hands unless a poll is demanded.</li>
                        <li>Before a vote is taken the chair must inform the meeting whether any proxy votes have been received and how the proxy votes are to be cast.</li>
                        <li>On a show of hands, a declaration by the chair is conclusive evidence of the result, provided that the declaration reflects the show of hands and the votes of the proxies received. Neither the chair nor the minutes need to state the number or proportion of the votes recorded for or against.</li>
                      </ul>
                    </section>

                    <section id="7.11.4" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.11.4 Matters on which members can demand a poll</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>At a general meeting, a poll may be demanded on any resolution.</li>
                        <li>A demand for a poll may be withdrawn.</li>
                      </ul>
                    </section>

                    <section id="7.11.5" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.11.5 When members can demand a poll</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>At a general meeting, a poll may be demanded by:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>at least 5 members entitled to vote on the resolution</li>
                            <li>members with at least 5% of the votes that may be cast on the resolution on a poll, or</li>
                            <li>the chair.</li>
                          </ul>
                        </li>
                        <li>The poll may be demanded:</li>
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>before a vote is taken</li>
                            <li>before the voting results on a show of hands are declared, or</li>
                            <li>immediately after the voting results on a show of hands are
                            declared.</li>
                          </ul>
                      </ul> 
                    </section>

                    <section id="7.11.6" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.11.6 When and how polls must be taken</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>At a general meeting, a poll on the election of a chair or on the question
                          of an adjournment must be taken immediately.</li>
                        <li>At a general meeting, a poll demanded on other matters must be taken
                          when and in the manner the chair directs.</li>
                      </ul>
                    </section>
                  </section>

                  <section id="7.12" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.12 Resolutions without a general meeting</h3>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The corporation may pass a resolution without a general meeting being held if all
                        the members entitled to vote on the resolution sign a document stating that they
                        are in favour of it. Each member of a joint membership must sign.</li>
                      <li>Auditors cannot be removed by a resolution without a general meeting.</li>
                      <li>Separate copies of a document under <a href="#7.12">rule 7.12(a)</a> may be used for signing by
                        members if the wording of the resolution and statement is identical in each copy.</li>
                      <li>A resolution under <a href="#7.12">rule 7.12(a)</a> is passed when the last member signs.</li>
                      <li>The corporation in passing a resolution under this rule without holding a meeting
                        satisfies any requirement in the Act:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>to give members information or a document relating to the resolution-by
                            giving members that information or document with the document to be
                            signed</li>
                          <li>to lodge with the Registrar a copy of a notice of meeting to consider the
                            resolution-by lodging a copy of the document to be signed by members</li>
                          <li>to lodge a copy of a document that accompanies a notice of meeting to
                            consider the resolution-by lodging a copy of the information or documents
                            referred to in <a href="#7.12">rule 7.12(e)(i)</a>.</li>
                        </ul>
                      </li>
                      <li>The passage of the resolution satisfies any requirement in the Act, or the
                        corporation&apos;s rules, that the resolution be passed at a general meeting.</li>
                      <li>This rule does not affect any rule of law relating to the assent of members not
                        given at a general meeting.</li>
                    </ul>
                  </section>

                  <section id="7.13" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.13 Resolutions if corporation has only 1 member</h3>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>If the corporation has only 1 member, the corporation may pass a resolution by
                        the member recording it and signing the record.</li>
                    </ul>
                  </section>

                  <section id="7.14" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.14 Proxies</h3>

                    <section id="7.14.1" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.14.1 Who may appoint a proxy</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>No proxies</li>
                        <li>NA</li>
                        <li>NA</li>
                      </ul>
                    </section>

                    <section id="7.14.2" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.14.2 Rights of proxies</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>Subject to this rule, a proxy appointed to attend and vote for a member
                          has the same rights as the member:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>to speak at the meeting</li>
                            <li>to vote (but only to the extent allowed by the appointment)</li>
                            <li>join in a demand for a poll.</li>
                          </ul>
                        </li>
                        <li>NA</li>
                        <li>A person must not exercise proxies for more than 3 members:</li>
                      </ul>
                      <div className="bg-sky-50 border-l-4 border-sky-500 p-4 my-4">
                        <p className="text-sky-900">
                          Note: However, a contravention of this <a href="#7.14.2">rule 7.14.2(c)</a> does not affect the
                          validity of the votes cast.
                        </p>
                      </div>
                    </section>

                    <section id="7.14.3" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.14.3 Appointing a proxy</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>An appointment of a proxy is valid if it is signed, or otherwise
                          authenticated as prescribed by the Regulations, by the member making
                          the appointment and contains the following information:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>the member&apos;s name and address</li>
                            <li>the corporation&apos;s name</li>
                            <li>the proxy&apos;s name or the name of the office held by the proxy</li>
                            <li>the meetings at which the appointment may be used.</li>
                          </ul>
                        </li>
                        <li>An undated appointment is taken to have been dated on the day it is
                          given to the corporation.</li>
                        <li>An appointment may specify the way the proxy is to vote on a particular
                          resolution. If it does:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>the proxy need not vote on a show of hands</li>
                            <li>if the proxy has 2 or more appointments that specify different
                              ways to vote on the resolution, the proxy must not vote on a show
                              of hands</li>
                            <li>if the proxy is the chair, the proxy must vote by poll, and must vote
                              as directed</li>
                            <li>if the proxy is not the chair, the proxy need not vote by poll.</li>
                            <li>If a proxy is also a member, this <a href="#7.14.3">rule 7.14.3(c)</a> does not affect how
                              the person casts any votes they hold as a member.</li>
                          </ul>
                        </li>
                        <li>A person who contravenes this rule commits an offence under the Act,
                          but only if the person&apos;s appointment as a proxy resulted from the
                          corporation sending to members:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>a list of persons willing to act as proxies, or</li>
                            <li>a proxy appointment form holding the person out as being willing
                              to act as a proxy.</li>
                          </ul>
                        </li>
                        <li>An appointment of a proxy does not have to be witnessed.</li>
                        <li>A later appointment of a proxy revokes an earlier one if both
                          appointments could not be validly exercised at the meeting.</li>
                      </ul>
                    </section>

                    <section id="7.14.4" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.14.4 Receipt of proxy documents</h4>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>For an appointment of a proxy for a meeting of members to be
                          effective, the following documents must be received by the corporation
                          at least 48 hours before the meeting:
                          <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                            <li>the proxy&apos;s appointment</li>
                            <li>if the appointment is signed by the appointor&apos;s attorney, the
                            authority or a certified copy of the authority.</li>
                          </ul>
                        </li>
                        <li>If a meeting has been adjourned an appointment and any authority
                          received by the corporation at least 48 hours beforehand is still valid
                          when the meeting resumes.</li>
                        <li>The period of notice for appointing proxies may be reduced.</li>
                      </ul>
                    </section>
                  </section>

                  <section id="7.15" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.15 Body corporate representative</h3>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>A body corporate may appoint an individual to represent it and that person has
                        all the powers of membership:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>at meetings of the corporation&apos;s members</li>
                          <li>at meetings of creditors</li>
                          <li>relating to resolutions to be passed without meetings</li>
                          <li>in the capacity of a member&apos;s proxy</li>
                          <li>The appointment may be a standing one.</li>
                        </ul>
                      </li>
                      <li>An appointment may set out restrictions on the representative&apos;s powers. If the
                        appointment applies to a particular position within the body corporate, the
                        appointment must identify that position.</li>
                      <li>A body corporate may appoint more than 1 representative but only 1
                        representative may exercise the body&apos;s powers at any one time.</li>
                    </ul>
                  </section>

                  <section id="7.16" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.16 Questions at AGMs</h3>

                    <section id="7.16.1" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.16.1 Questions and comments by members on corporation management at AGM</h4>
                      <p className="text-gray-600">
                        The chair of an AGM must give members a reasonable opportunity to ask
                        questions about or make comments on the management of the corporation.
                      </p>
                    </section>

                    <section id="7.16.2" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.16.2 Questions by members of auditors at AGM</h4>
                      <p className="text-gray-600 mb-4">
                        If the corporation&apos;s auditor or the auditor&apos;s representative is at an AGM, the
                        chair of the meeting must give members a reasonable opportunity to ask the
                        auditor or the auditor&apos;s representative questions relevant to:
                      </p>
                      <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                        <li>the conduct of the audit</li>
                        <li>the preparation and content of the auditor&apos;s report</li>
                        <li>the accounting policies adopted by the corporation in the preparation of
                          the financial statements</li>
                        <li>the independence of the auditor in relation to the conduct of the audit.</li>
                      </ul>
                    </section>
                  </section>

                  <section id="7.17" className="scroll-mt-32 ml-4 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">7.17 Adjourned meetings</h3>

                    <section id="7.17.1" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.17.1 When resolution passed after adjournment of meeting</h4>
                      <p className="text-gray-600">
                        A resolution passed at a general meeting resumed after an adjournment is
                        passed on the day it was passed.
                      </p>
                    </section>

                    <section id="7.17.2" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.17.2 Business at adjourned meetings</h4>
                      <p className="text-gray-600">
                        Only unfinished business is to be transacted at a general meeting resumed
                        after an adjournment.
                      </p>
                    </section>

                    <section id="7.17.3" className="scroll-mt-32 ml-4 mt-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">7.17.3 Re-notification of adjourned meeting</h4>
                      <p className="text-gray-600">
                        If a general meeting is adjourned for 30 days or more, at least 21 days&apos;
                        notice must be given to the members, directors and the secretary or contact
                        person of the day, time and place of when the general meeting will be
                        resumed.
                      </p>
                    </section>
                  </section>
                </section>
                              {/* Section 8 - Directors of the corporation */}
              <section id="8" className="scroll-mt-32">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Directors of the corporation</h2>

                {/* Section 8.1 - Numbers of directors */}
                <section id="8.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8.1 Numbers of directors</h3>

                  <section id="8.1.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8.1.1 Minimum number of directors</h4>
                    <p className="text-gray-600 mb-4">If the corporation has:</p>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>1 member, the corporation must have at least 1 director</li>
                      <li>2 members, the corporation must have at least 2 directors</li>
                      <li>more than 2 members, the corporation must have at least 3 directors.</li>
                    </ul>
                  </section>

                  <section id="8.1.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8.1.2 Maximum number of directors</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The corporation must not have more than 5 directors.</li>
                    </ul>
                  </section>
                </section>

                {/* Section 8.2 - Eligibility to be a director */}
                <section id="8.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8.2 Eligibility to be a director</h3>

                  <section id="8.2.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8.2.1 Eligibility for appointment as a director</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>An individual is eligible for appointment as a director if they are an
                        individual who is:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>a member and at least 18 years of age</li>
                          <li>A person who is eligible for appointment as a director may not be
                            of Aboriginal or Torres Strait Islander or Aboriginal and Torres
                            Strait Islander descent, providing that the number of non
                            Aboriginal or Torres Strait Islander appointees is restricted to one
                            person.</li>
                          <li>Directors of the corporation must not hold any position of
                            employment in the corporation.</li>
                        </ul>
                      </li>
                      <li>An individual who is disqualified from managing Aboriginal and Torres
                        Strait Islander corporations under Part 6 5 of the Act may only be
                        appointed as a director of the corporation if the appointment is made:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>with permission granted by the Registrar, or</li>
                          <li>with leave granted by the court.</li>
                        </ul>
                      </li>
                    </ul>
                    <div className="bg-sky-50 border-l-4 border-sky-500 p-4 my-4">
                      <p className="text-sky-900">
                        Note: You may add additional criteria restricting who may become a
                        director by amending your constitution.
                      </p>
                    </div>
                  </section>

                  <section id="8.2.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8.2.2 Majority of director requirements</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>A majority of the directors of the corporation must be individuals who
                        are Aboriginal and Torres Strait Islander persons.</li>
                      <li>A majority of the directors must ordinarily reside in Australia.</li>
                      <li>A majority of the directors must be members.</li>
                      <li>A majority of the directors must not be employees of the corporation.</li>
                      <li>The chief executive officer:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>may be a director but cannot chair the directors&apos; meetings and</li>
                          <li>counts as an employee for the purposes of <a href="#8.2.2">rule 8.2.2(d)</a>.</li>
                        </ul>
                      </li>
                    </ul>
                  </section>

                  <section id="8.2.3" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8.2.3 Consent to act as director</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>Before a person may be appointed as a director, that person must give
                        the corporation a signed consent to act as a director of the corporation.</li>
                      <li>The corporation must keep the consent.</li>
                    </ul>
                  </section>
                </section>

                {/* Section 8.3 - Directors on registration */}
                <section id="8.3" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8.3 Directors on registration</h3>
                  <p className="text-gray-600">
                    A person becomes a director, secretary or contact person of the corporation on
                    registration of the corporation if the person is specified in the application for
                    incorporation and they have given their consent.
                  </p>
                </section>

                {/* Section 8.4 - Becoming a director by appointment */}
                <section id="8.4" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8.4 Becoming a director by appointment</h3>

                  <section id="8.4.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8.4.1 The corporation may appoint a director</h4>
                    <p className="text-gray-600">
                      The corporation may appoint a person as a director by resolution passed in
                      general meeting.
                    </p>
                  </section>

                  <section id="8.4.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8.4.2 Directors may appoint other directors to make up a quorum</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>As long as the maximum number of directors is not exceeded, the
                        directors of the corporation may appoint a person as a director to make
                        up a quorum.</li>
                      <li>If the total number of directors does not make up a quorum, a person
                        can be appointed under <a href="#8.4.2">rule 8.4.2(a)</a> to make up a quorum for a
                        directors&apos; meeting.</li>
                      <li>If a person is appointed under <a href="#8.4.2">rule 8.4.2(a)</a>, the corporation must
                        confirm the appointment by resolution at the corporation&apos;s next AGM. If
                        the appointment is not confirmed, the person ceases to be a director of
                        the corporation at the end of the AGM.</li>
                    </ul>
                  </section>
                </section>

                {/* Section 8.5 - Term of appointment */}
                <section id="8.5" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8.5 Term of appointment</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>If the application for registration of the corporation identifies a director who is to
                      be appointed for only one year, that appointment ends at the first AGM that
                      occurs more than one year after the date of the corporation&apos;s registration.</li>
                    <li>Subject to <a href="#8.5">rule 8.5(d)</a>, a director must not be appointed for more than 2 years.</li>
                    <li>A director is eligible for reappointment.</li>
                    <li>If the terms of appointment of all of the directors of the corporation expire so that
                      there are no directors at a particular time, the terms are extended until the next
                      general meeting that occurs after the last director&apos;s appointment has expired.</li>
                  </ul>
                </section>

                {/* Section 8.6 - Rotation of directors */}
                <section id="8.6" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8.6 Rotation of directors</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>Directors will be elected on rotation for a two-year term, so that the appointment
                      of half of the directors expires each year.</li>
                    <li>To implement the rotational system:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>the directors of the corporation on registration of the corporation will only
                          hold office until the first AGM of the corporation and will be eligible for reappointment</li>
                        <li>at the first AGM of the corporation:
                          <ul className="list-[upper-alpha] ml-6 mt-2 space-y-2">
                            <li>half of the directors will be appointed for a term of two years and</li>
                            <li>the other half of the directors will be appointed for a term of one year
                              and</li>
                          </ul>
                        </li>
                        <li>at subsequent AGMs of the corporation, the appointment of any directors
                          at that AGM will be for two years.</li>
                      </ul>
                    </li>
                  </ul>
                </section>

                {/* Section 8.7 - Alternate directors */}
                <section id="8.7" className="scroll-mt-32">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8.7 Alternate directors</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>With the other directors&apos; approval, a director (appointing director) may appoint an
                      alternate to exercise some or all of the director&apos;s powers for a specified period.</li>
                    <li>If the appointing director asks the corporation to give the alternate director notice
                      of directors&apos; meetings, the corporation must do so.</li>
                    <li>The appointing director may terminate the alternate&apos;s appointment at any time.</li>
                    <li>An appointment of an alternate or its termination must be in writing. A copy must
                      be given to the corporation.</li>
                  </ul>
                </section>

                {/* Section 8.8 - How a person ceases to be a director */}
                <section id="8.8" className="scroll-mt-32 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8.8 How a person ceases to be a director</h3>

                  <section id="8.8.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8.8.1</h4>
                    <p className="text-gray-600 mb-4">A person ceases to be a director if:</p>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>the person dies</li>
                      <li>the person resigns as a director as provided for in <a href="#8.9">rule 8.9</a></li>
                      <li>the term of the person&apos;s appointment as a director expires</li>
                      <li>the person is removed as a director by the members as provided for in
                        <a href="#8.10.1">rule 8.10.1</a></li>
                      <li>the person is removed as a director by the other directors as provided
                        for in <a href="#8.10.2">rule 8.10.2</a>, or</li>
                      <li>the person becomes disqualified from managing Aboriginal and Torres
                        Strait Islander corporations under Part 6 5 of the Act.</li>
                    </ul>
                  </section>
                </section>

                {/* Section 8.9 - Resignation of director */}
                <section id="8.9" className="scroll-mt-32 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8.9 Resignation of director</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>A director may resign as a director by giving notice of resignation in writing to the
                      corporation.</li>
                  </ul>
                </section>

                {/* Section 8.10 - Process for removing a director */}
                <section id="8.10" className="scroll-mt-32 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8.10 Process for removing a director</h3>

                  <section id="8.10.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8.10.1 Removal by members</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The corporation may, by resolution in general meeting, remove a
                        director from office despite anything in:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the corporation&apos;s constitution</li>
                          <li>an agreement between the corporation and the director
                            concerned, or</li>
                          <li>an agreement between any or all members of the corporation and
                            the director concerned.</li>
                        </ul>
                      </li>
                      <li>A notice of intention to move a resolution to remove a director must be
                        given to the corporation at least 21 days before the meeting is to be
                        held. However, if the corporation calls a meeting after the notice of
                        intention is given, the meeting may pass the resolution even though the
                        meeting is held less than 21 days after the notice is given.</li>
                      <li>The corporation must give the director concerned a copy of the notice
                        as soon as possible after it is received.</li>
                      <li>The director concerned is entitled to put his or her case to members by:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>giving the corporation a written statement for circulation to
                            members (see <a href="#8.10.1">rules 8.10.1(e) and (f)</a>)</li>
                          <li>speaking to the motion at the meeting (whether or not the director
                            concerned is a member).</li>
                        </ul>
                      </li>
                      <li>The corporation is to circulate the written statement given under <a href="#8.10.1">rule 8.10.1(d)(i)</a> to members by:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>sending a copy to everyone to whom notice of the meeting is sent
                            if there is time to do so, or</li>
                          <li>if there is not time to comply with <a href="#8.10.1">rule 8.10.1(e)(i)</a>, having the
                            statement distributed to members attending the meeting and read
                            out at the meeting before the resolution is voted on.</li>
                        </ul>
                      </li>
                      <li>The written statement given under <a href="#8.10.1">rule 8.10.1(d)(i)</a> does not have to be
                        circulated to members if it is defamatory.</li>
                      <li>If a person is appointed to replace a director removed under this rule,
                        the time at which:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>(i) the replacement director, or</li>
                          <li>(ii) any other director,</li>
                          <li>is to retire is to be worked out as if the replacement director had
                            become a director on the day on which the replaced director was last
                            appointed a director.</li>
                        </ul>
                      </li>
                    </ul>
                  </section>

                  <section id="8.10.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8.10.2 Removal by other directors</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The only ground on which the directors may remove a director from
                        office is that they fail without reasonable excuse to attend 3 or more
                        consecutive directors&apos; meetings. The directors may remove a director
                        by resolution.</li>
                      <li><a href="#8.10.2">Rule 8.10.2(a)</a> operates despite anything in:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the corporation&apos;s constitution</li>
                          <li>an agreement between the corporation and the director
                            concerned, or</li>
                          <li>an agreement between any or all members and the director
                            concerned.</li>
                        </ul>
                      </li>
                      <li>Before removing the director concerned, the directors must give the
                        director concerned notice in writing:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>stating that the directors intend to remove the director concerned
                            from office because they have failed without reasonable excuse to
                            attend 3 or more consecutive directors&apos; meetings</li>
                          <li>stating that the director concerned has 14 days to object in writing
                            to the removal</li>
                        </ul>
                      </li>
                      <li>If the director concerned does not object, the directors must remove the
                        director concerned.</li>
                      <li>If the director concerned does object:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the directors cannot remove the director concerned</li>
                          <li>the corporation, by resolution in general meeting, may remove the
                            director in accordance with <a href="#8.10.1">rule 8.10.1</a>.</li>
                        </ul>
                      </li>
                      <li>If the director concerned is removed, the corporation must give them a
                        copy of the resolution as soon as possible after the resolution has been
                        passed.</li>
                      <li>If a person is appointed to replace a director removed under this rule,
                        the time at which:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the replacement director, or</li>
                          <li>any other director,</li>
                          <li>is to retire is to be worked out as if the replacement director had
                            become a director on the day on which the replaced director was last
                            appointed a director.</li>
                        </ul>
                      </li>
                    </ul>
                  </section>
                </section>

                {/* Section 8.11 - Aboriginal and Torres Strait Islander community advisors */}
                <section id="8.11" className="scroll-mt-32 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8.11 Aboriginal and Torres Strait Islander community advisors</h3>

                  <section id="8.11.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">8.11.1 Aboriginal and Torres Strait Islander community advisors with maximum number to be no more than 15.</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>to be nominated at Board&apos;s discretion.</li>
                      <li>Aboriginal and Torres Strait Islander advisors to attend Board meetings
                        at the invitation of the Board;</li>
                      <li>the ATSI community advisors may partake in discussions but will refrain
                        from voting;</li>
                      <li>ATSI community advisors must abide by rules of the corporation and as
                        such are not to disclose any confidential business of the corporation.</li>
                    </ul>
                  </section>
                </section>
              </section>

              {/* Section 9 - General duties */}
              <section id="9" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">9. General duties</h2>

                <section id="9.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">9.1 General duties</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>The directors, secretary, other officers and employees must comply with the
                      duties imposed on them by the Act and the general law. These may include, for
                      example:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>a duty of care and diligence</li>
                        <li>a duty of good faith</li>
                        <li>a duty of disclosure of material personal interests (see <a href="#10.2">rule 10.2</a>)</li>
                        <li>a duty not to improperly use position or information</li>
                        <li>a duty to prevent insolvent trading.</li>
                      </ul>
                    </li>
                    <li>The directors will be liable for debts and other obligations incurred by the
                      corporation while acting, or purporting to act, as trustee.</li>
                  </ul>
                </section>
              </section>

              {/* Section 10 - Functions, powers and duties of directors */}
              <section id="10" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Functions, powers and duties of directors</h2>

                <section id="10.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">10.1 Powers of directors</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>The business of the corporation is to be managed by or under the direction of
                      the directors.</li>
                    <li>The directors may exercise all the powers of the corporation except any that the
                      Act or the corporation&apos;s constitution requires the corporation to exercise in
                      general meeting.</li>
                  </ul>
                </section>

                <section id="10.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">10.2 Duty of director to disclose material personal interests</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>A director who has a material personal interest in a matter that relates to the
                      affairs of the corporation must give the other directors notice of the interest
                      unless <a href="#10.2">rule 10.2(b)</a> says otherwise.</li>
                    <li>A director does not need to give notice of an interest under <a href="#10.2">rule 10.2(a)</a> if:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>the interest:
                          <ul className="list-[upper-alpha] ml-6 mt-2 space-y-2">
                            <li>arises because the director is a member and is held in common with
                              the other members</li>
                            <li>arises in relation to the director&apos;s remuneration as a director</li>
                            <li>relates to a contract the corporation is proposing to enter into that is
                              subject to approval by the members and will not impose any obligation
                              on the corporation if it is not approved by the members</li>
                          </ul>
                        </li>
                        <li>all the following conditions are satisfied:
                          <ul className="list-[upper-alpha] ml-6 mt-2 space-y-2">
                            <li>the director has already given notice of the nature and extent of the
                              interest and its relation to the affairs of the corporation under <a href="#10.2">rule 10.2(a)</a></li>
                            <li>if a person who was not a director when the notice under <a href="#10.2">rule 10.2(a)</a>
                              was given is appointed as a director, the notice is given to that person</li>
                            <li>the nature or extent of the interest has not materially increased above
                              that disclosed in the notice or</li>
                          </ul>
                        </li>
                        <li>the director has given a standing notice of the nature and extent of the
                          interest and that notice is still effective.</li>
                      </ul>
                    </li>
                    <li>The notice required by <a href="#10.2">rule 10.2(a)</a> must:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>give details of:
                          <ul className="list-[upper-alpha] ml-6 mt-2 space-y-2">
                            <li>the nature and extent of the interest</li>
                            <li>the relation of the interest to the affairs of the corporation</li>
                          </ul>
                        </li>
                        <li>be given at a directors&apos; meeting as soon as possible after the director
                          becomes aware of their interest in the matter.</li>
                        <li>The details must be recorded in the minutes of the meeting.</li>
                      </ul>
                    </li>
                    <li>A contravention of this <a href="#10.2">rule 10.2</a> by a director does not affect the validity of any
                      act, transaction, agreement, instrument, resolution or other thing.</li>
                    <li>This <a href="#10.2">rule 10.2</a> does not apply to the corporation if the corporation has only 1
                      director.</li>
                  </ul>
                </section>

                <section id="10.3" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">10.3 Remuneration</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>The directors are not to be paid remuneration.</li>
                    <li><a href="#10.3">Rule 10.3(a)</a> does not prevent:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>a director who is an employee of the corporation from receiving
                          remuneration as an employee of the corporation, or</li>
                        <li>reasonable payments (having regard to the market costs of obtaining
                          similar goods or services) to the director for a contract for goods or
                          services, provided that <a href="#10.2">rule 10.2</a> has been complied with.</li>
                      </ul>
                    </li>
                    <li>The corporation may pay the directors&apos; travelling and other expenses that the
                      directors incur:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>in attending directors&apos; meetings or any meetings of committees of directors</li>
                        <li>in attending any general meetings of the corporation</li>
                        <li>in connection with the corporation&apos;s business.</li>
                      </ul>
                    </li>
                  </ul>
                </section>

                <section id="10.4" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">10.4 Negotiable instruments</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>Any 2 directors of the corporation, or the director if the corporation has only 1
                      director, may sign, draw, accept, endorse or otherwise execute a negotiable
                      instrument.</li>
                    <li>The directors may determine that a negotiable instrument may be signed, drawn,
                      accepted, endorsed or otherwise executed in a different way.</li>
                  </ul>
                </section>

                <section id="10.5" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">10.5 Delegation</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>The directors may by resolution delegate any of their powers to:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>a committee of directors</li>
                        <li>a director</li>
                        <li>an employee of the corporation, or</li>
                        <li>any other person.</li>
                      </ul>
                    </li>
                    <li>A delegate must exercise the powers delegated in accordance with any
                      directions of the directors.</li>
                    <li>The exercise of a power by a delegate is as effective as if the directors had
                      exercised it.</li>
                  </ul>
                </section>

                <section id="10.6" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">10.6 Member approval needed for related party benefit</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>For the corporation, or an entity that the corporation controls, to give a financial
                      benefit to a related party of the corporation:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>the corporation or entity must:
                          <ul className="list-[upper-alpha] ml-6 mt-2 space-y-2">
                            <li>obtain the approval of the members in the way set out in Division 290
                              of the Act, and</li>
                            <li>give the benefit within 15 months after the approval, or</li>
                          </ul>
                        </li>
                        <li>the giving of the benefit must fall within an exception to the requirement for
                          member approval set out in Division 287 of the Act.</li>
                      </ul>
                    </li>
                    <li>If:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>the giving of the benefit is required by a contract</li>
                        <li>the making of the contract was approved in accordance with <a href="#10.6">rule 10.6(a)(i)(A)</a> and</li>
                        <li>the contract was made:
                          <ul className="list-[upper-alpha] ml-6 mt-2 space-y-2">
                            <li>within 15 months after that approval, or</li>
                            <li>before that approval, if the contract was conditional on the approval
                              being obtained,</li>
                          </ul>
                        </li>
                      </ul>
                      member approval for the giving of the benefit is taken to have been given and
                      the benefit need not be given within the 15 months.</li>
                  </ul>
                </section>
              </section>

              {/* Section 11 - Directors meetings */}
              <section id="11" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">11. Directors meetings</h2>

                <section id="11.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">11.1 Frequency of directors meetings</h3>
                  <p className="text-gray-600">
                    The directors will meet as often as the directors consider necessary for the good
                    functioning of the corporation, but must meet at least once every 3 months.
                  </p>
                </section>

                <section id="11.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">11.2 Calling and giving notice of directors&apos; meetings</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>The directors will normally determine the date, time and place of each directors&apos;
                      committee meeting at the previous meeting.</li>
                    <li>A directors&apos; meeting may be called by a director giving reasonable notice
                      individually to every other director.</li>
                    <li>The date, time and place for a directors&apos; meeting must not unreasonably prevent
                      a director attending.</li>
                    <li>Reasonable notice of each directors&apos; meeting must be given to each director.
                      The notice must state:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>the date, time and place of the meeting</li>
                        <li>the general nature of the business to be conducted at the meeting</li>
                        <li>any proposed resolutions.</li>
                      </ul>
                    </li>
                    <li>A resolution passed at a directors&apos; meeting will not be invalid only because of an
                      unintentional omission or mistake in giving notice of the directors&apos; meeting under{" "}
                      <a href="#11.2">rule 11.2(d)</a> or in giving notice of any changes to the item, date or place of the
                      directors&apos; meeting.</li>
                  </ul>
                </section>

                <section id="11.3" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">11.3 Quorum at directors meetings</h3>
                  <p className="text-gray-600">
                    The quorum for a directors&apos; meeting is a majority of the directors, and the quorum
                    must be present at all times during the meeting.
                  </p>
                </section>

                <section id="11.4" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">11.4 Chairing directors meetings</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>The directors may elect a director to chair their meetings. The directors may
                      determine the period for which that director is to be the chair.</li>
                    <li>The directors must elect a director present to chair a meeting, or part of it, if:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>a director has not already been elected to chair the meeting, or</li>
                        <li>a previously elected chair is not available, or declines to act, for the
                          meeting or the part of the meeting.</li>
                      </ul>
                    </li>
                  </ul>
                </section>

                <section id="11.5" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">11.5 Use of technology</h3>
                  <p className="text-gray-600">
                    A directors&apos; meeting may be called or held using any technology consented to by all
                    the directors. The consent may be a standing one. A director may only withdraw his or
                    her consent within a reasonable period before the meeting.
                  </p>
                </section>

                <section id="11.6" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">11.6 Resolutions at directors meetings</h3>

                  <section id="11.6.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">11.6.1 Passing of directors resolutions</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>A resolution of the directors must be passed by a majority of the votes
                        cast by directors entitled to vote on the resolution.</li>
                      <li>The chair has a casting vote if necessary in addition to any vote they
                        have as a director.</li>
                    </ul>
                  </section>

                  <section id="11.6.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">11.6.2 Circulating resolutions if the corporation has more than 1 director</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>the directors may pass a resolution without a directors&apos; meeting being
                        held if all the directors entitled to vote on the resolution sign a
                        statement that they are in favour of the resolution set out in the
                        document.</li>
                      <li>Separate copies of a document under <a href="#11.6.2">rule 11.6.2(a)</a> may be used for
                        signing by directors if the wording of the resolution and statement is
                        identical in each copy.</li>
                      <li>A resolution under <a href="#11.6.2">rule 11.6.2(a)</a> is passed when the last director signs.</li>
                    </ul>
                  </section>

                  <section id="11.6.3" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">11.6.3 Resolutions and declarations of 1 director corporation</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>the director may pass a resolution by recording it and signing the
                        record.</li>
                      <li>the director may make a declaration by recording it and signing the
                        record. This satisfies any requirement in the Act that the declaration be
                        made at a directors&apos; meeting.</li>
                    </ul>
                  </section>
                </section>
              </section>

              {/* Section 12 - Secretary and contact person */}
              <section id="12" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">12. Secretary and contact person</h2>

                <section id="12.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">12.1 Requirements for secretary or contact person</h3>

                  <section id="12.1.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">12.1.1 Who may be a secretary or contact person</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>Only an individual who is at least 18 years of age may be appointed as
                        a secretary or contact person of the corporation.</li>
                      <li>A person who is disqualified from managing an Aboriginal and Torres
                        Strait Islander corporation under Part 6-5 of the Act may only be
                        appointed as a secretary or contact person if the appointment is made
                        with:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the Registrar&apos;s permission under section 279-30(7) of the Act, or</li>
                          <li>the leave of the court under section 279-35 of the Act.</li>
                        </ul>
                      </li>
                    </ul>
                  </section>

                  <section id="12.1.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">12.1.2 Consent to act as secretary or contact person</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The corporation must receive a signed consent from a person to act as
                        secretary or contact person of the corporation, before that person is
                        appointed as secretary or contact person of the corporation</li>
                      <li>The corporation must keep each consent received under <a href="#12.1.2">rule 12.1.2(a)</a>.</li>
                    </ul>
                  </section>
                </section>

                <section id="12.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">12.2 Becoming a secretary or a contact person on registration</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>A person becomes a secretary or a contact person of the corporation on
                      registration of the corporation, if the person is specified in the application with his
                      or her consent as a proposed secretary or contact person of the corporation.</li>
                    <li>If:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>the corporation is registered as a small or medium corporation and</li>
                        <li>the application for registration does not specify a person to be the contact
                          person for the corporation</li>
                        <li>the applicant becomes the contact person for the corporation on
                          registration.</li>
                      </ul>
                    </li>
                    <li>If:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>a person is specified in the application for registration of the corporation as
                          the contact person for the corporation</li>
                        <li>that person is specified without his or her consent</li>
                        <li>before registration, the Registrar becomes aware of that fact and</li>
                        <li>the Registrar determines, by notice in writing given to the applicant, that the
                          applicant for registration is the contact person for the corporation on
                          registration,</li>
                        <li>the applicant becomes the contact person for the corporation on
                          registration.</li>
                      </ul>
                    </li>
                  </ul>
                </section>

                <section id="12.3" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">12.3 How a secretary or contact person is appointed</h3>
                  <p className="text-gray-600">
                    The directors appoint a secretary or contact person.
                  </p>
                </section>

                <section id="12.4" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">12.4 Terms and conditions of office</h3>

                  <section id="12.4.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">12.4.1 Terms and conditions of office for secretaries</h4>
                    <p className="text-gray-600">
                      A secretary holds office on the terms and conditions (including
                      remuneration) that the directors determine.
                    </p>
                  </section>

                  <section id="12.4.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">12.4.2 Terms and conditions of contact person&apos;s appointment</h4>
                    <p className="text-gray-600">
                      A contact person&apos;s appointment is subject to the terms and conditions
                      (including remuneration) that the directors determine.
                    </p>
                  </section>
                </section>

                <section id="12.5" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">12.5 Duties of secretary and contact person</h3>

                  <section id="12.5.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">12.5.1 Contact person must pass on communications received</h4>
                    <p className="text-gray-600 mb-4">
                      While entered on the Register of Aboriginal and Torres Strait Islander
                      Corporations as the contact person, a person:
                    </p>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>appointed with his or her consent as the contact person, or</li>
                      <li>determined to be the contact person,</li>
                    </ul>
                    <p className="text-gray-600 mt-4">
                      must pass on to a least one of the directors each communication received
                      by that person for the corporation within 14 days after receiving it.
                    </p>
                  </section>

                  <section id="12.5.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">12.5.2 Secretary must pass on communications received</h4>
                    <p className="text-gray-600">
                      While entered on the Register of Aboriginal and Torres Strait Islander
                      Corporations as the secretary, a person appointed with his or her consent to
                      be the secretary must pass on to a least one of the directors each
                      communication received by that person for the corporation within 14 days
                      after receiving it.
                    </p>
                  </section>

                  <section id="12.5.3" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">12.5.3 Effectiveness of acts by secretaries</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>An act done by the secretary is effective even if their appointment is
                        invalid because the corporation or secretary did not comply with the
                        corporation&apos;s constitution or the Act.</li>
                      <li><a href="#12.5.3">Rule 12.5.3(a)</a> does not deal with the question whether an effective act
                        by a secretary:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>binds the corporation in its dealings with other people or</li>
                          <li>makes the corporation liable to another person.</li>
                        </ul>
                      </li>
                    </ul>
                  </section>
                </section>
              </section>

              {/* Section 13 - Execution of document and the common seal */}
              <section id="13" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">13. Execution of document and the common seal of the Corporation</h2>

                <section id="13.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">13.1 Corporation may have common seal</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>The corporation may have a common seal.</li>
                    <li>If the corporation does have a common seal:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>the corporation must set out on it the corporation&apos;s name and ICN</li>
                        <li>the common seal must be kept by a person nominated by the directors.</li>
                        <li>The corporation may have a duplicate common seal. The duplicate must
                          be a copy of the common seal with the words &apos;duplicate seal&apos; added.</li>
                      </ul>
                    </li>
                  </ul>
                </section>

                <section id="13.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">13.2 Execution of documents</h3>

                  <section id="13.2.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">13.2.1 Agent exercising corporation&apos;s power to make contracts etc.</h4>
                    <p className="text-gray-600">
                      The corporation&apos;s power to make, vary, ratify or discharge a contract may be
                      exercised by an individual acting with the corporation&apos;s express or implied
                      authority and on behalf of the corporation. The power may be exercised
                      without using a common seal.
                    </p>
                  </section>

                  <section id="13.2.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">13.2.2 Execution of documents (including deeds) by the corporation</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The corporation may execute a document without using a common seal
                        if the document is signed by:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>2 directors</li>
                          <li>a director and a secretary (if any), or</li>
                          <li>if the corporation has only 1 director, that director.</li>
                        </ul>
                      </li>
                      <li>If the corporation has a common seal, the corporation may execute a
                        document if the seal is fixed to the document and the fixing of the seal
                        is witnessed by:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>2 directors</li>
                          <li>a director and a secretary, or</li>
                          <li>if the corporation has only 1 director, that director.</li>
                        </ul>
                      </li>
                      <li>The corporation may execute a document as a deed if the document is
                        expressed to be executed as a deed and is executed in accordance
                        with <a href="#13.2.2">rule 13.2.2(a)</a> or <a href="#13.2.2">rule 13.2.2(e)</a>.</li>
                      <li>This <a href="#13.2.2">rule 13.2.2</a> does not limit the ways in which the corporation may
                        execute a document (including a deed).</li>
                    </ul>
                  </section>
                </section>
              </section>

              {/* Section 14 - Finances and record keeping */}
              <section id="14" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">14. Finances and record keeping</h2>

                <section id="14.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">14.1 Application of funds and property</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>Subject to the Act and the corporation&apos;s constitution, all funds or property of the
                      corporation not subject to any special trust can be used at the discretion of the
                      directors to carry out the corporation&apos;s objectives.</li>
                    <li>Subject to the Act and the corporation&apos;s constitution, no portion of the funds and
                      property of the corporation may be paid or distributed to any member of the
                      corporation.</li>
                    <li>Nothing in <a href="#14.1">rule 14.1(b)</a> is intended to prevent:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>the payment in good faith of reasonable wages to a member who is an
                          employee of the corporation (having regard to the circumstances of the
                          corporation and the qualifications, role and responsibilities of the member
                          as an employee), or</li>
                        <li>reasonable payment in good faith to a member for a contract for goods or
                          services provided by that member (having regard to the market costs for
                          obtaining similar goods or services in the area where the goods or services
                          are to be provided).</li>
                      </ul>
                    </li>
                    <li>Gift Fund Rules
                      <p className="text-gray-600 mt-2">
                        The corporation shall maintain for the main purpose of the corporation a gift fund
                        to be named &apos;The Gold Coast Aboriginal and Torres Strait Islander Corporation
                        for Community Consultation Gift Fund&apos;
                      </p>
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>which can receive gifts of money or property for the purposes of the
                          objectives of the corporation</li>
                        <li>which can have credited to it any money received by the corporation
                          because of those gifts</li>
                        <li>The gift fund cannot receive any money or property other than that stated
                          at (ii).</li>
                        <li>The corporation shall use gifts made to the gift fund and any money
                          received because of them only for the principal purpose of the corporation.</li>
                        <li>Receipts issued for gifts to the gift fund must state:
                          <ul className="list-[upper-alpha] ml-6 mt-2 space-y-2">
                            <li>the full name of the corporation</li>
                            <li>the Australian Business Number 81093734906 and the Indigenous
                              Corporation Number 7228 of the corporation</li>
                            <li>the fact that the receipt is for a gift.</li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </section>

                <section id="14.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">14.2 Minutes of meetings</h3>

                  <section id="14.2.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">14.2.1 Obligation to keep minutes</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The corporation must keep minute books in which it records within 1
                        month:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>proceedings and resolutions of general meetings</li>
                          <li>proceedings and resolutions of directors&apos; meetings (including
                            meetings of a committee of directors)</li>
                          <li>resolutions passed by members without a meeting</li>
                          <li>resolutions passed by directors without a meeting</li>
                          <li>if the corporation has only 1 director, the making of declarations
                            by the director.</li>
                        </ul>
                      </li>
                      <li>The minutes of the meeting may be kept:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>in writing, or</li>
                          <li>by means of an audio, or audio-visual, recording.</li>
                        </ul>
                      </li>
                      <li>If the minutes of the meeting are kept by means of an audio, or audio
                        visual, recording of the meeting, the corporation must ensure that, on
                        the recording:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>each person attending the meeting states their name and</li>
                          <li>if a person attending the meeting holds a proxy, the person states
                            the name of the person for whom the person is acting as proxy.</li>
                        </ul>
                      </li>
                      <li>If the minutes of the meeting are kept in writing, the corporation must
                        ensure that either:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the chair of the meeting, or</li>
                          <li>the chair of the next meeting,</li>
                          <li>signs those minutes within a reasonable time after the first
                            meeting.</li>
                        </ul>
                      </li>
                      <li>If the minutes of the meeting are kept by means of an audio, or audio
                        visual, recording, the corporation must ensure that either:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the chair of the meeting, or</li>
                          <li>the chair of the next meeting,</li>
                          <li>signs a declaration under <a href="#14.2.1">rule 14.2.1(f)</a> within a reasonable time</li>
                        </ul>
                      </li>
                      <li>The declaration under this <a href="#14.2.1">rule 14.2.1(f)</a> must:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>identify the audio, or audio-visual, recording</li>
                          <li>if the recording is not a recording of the whole of the meeting,
                            identify the part of the meeting that is recorded</li>
                          <li>declare that the recording constitutes the minutes of the meeting
                            or that part of the meeting.</li>
                        </ul>
                      </li>
                      <li>The corporation must ensure that minutes of the passing of a resolution
                        without a meeting are signed by a director within a reasonable time
                        after the resolution is passed.</li>
                      <li>If the corporation has only 1 director, that director must sign the
                        minutes of the making of a declaration by that director within a
                        reasonable time after the declaration is made.</li>
                      <li>The corporation must keep its minute books at:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>its registered office if it is registered as a large corporation, or</li>
                          <li>its document access address if it is registered as a small or
                            medium corporation.</li>
                        </ul>
                      </li>
                      <li>A minute that is recorded and signed in accordance with this <a href="#14.2.1">rule 14.2.1</a>{" "}
                        is evidence of the proceeding, resolution or declaration to which it
                        relates, unless the contrary is proved.</li>
                    </ul>
                  </section>
                </section>

                <section id="14.3" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">14.3 Constitution and records about officers, contact person, etc.</h3>
                  <p className="text-gray-600 mb-4">The corporation must keep:</p>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>an up-to-date copy of its constitution (incorporating any changes to the
                      constitution made in accordance with the Act and the terms of the constitution)</li>
                    <li>written records relating to:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>the names and addresses of the corporation&apos;s current officers and
                          secretary or contact person (as the case may be)</li>
                        <li>the corporation&apos;s registered office (if any)</li>
                        <li>the corporation&apos;s document access address (if any)</li>
                      </ul>
                    </li>
                  </ul>
                </section>

                <section id="14.4" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">14.4 Financial records</h3>

                  <section id="14.4.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">14.4.1 Obligation to keep financial records</h4>
                    <p className="text-gray-600 mb-4">The corporation must keep written financial records that:</p>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>correctly record and explain its transactions and financial position and
                        performance</li>
                      <li>would enable true and fair financial reports to be prepared and audited.</li>
                    </ul>
                    <div className="bg-sky-50 border-l-4 border-sky-500 p-4 mt-4">
                      <p className="text-sky-900">
                        Note: This obligation extends to transactions undertaken as trustee.
                      </p>
                    </div>
                  </section>

                  <section id="14.4.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">14.4.2 Period for which financial records must be retained</h4>
                    <p className="text-gray-600">
                      The financial records must be retained for 7 years after the transactions
                      covered by the records are completed.
                    </p>
                  </section>
                </section>

                <section id="14.5" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">14.5 Physical format</h3>
                  <p className="text-gray-600">
                    If the records that the corporation is required to keep under <a href="#14.3">rule 14.3</a> and <a href="#14.4">rule 14.4</a> are
                    kept in electronic form:
                  </p>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>the records must be convertible into hard copy;</li>
                    <li>that hard copy must be made available, within a reasonable time, to a person
                      who is entitled to inspect the records.</li>
                  </ul>
                </section>

                <section id="14.6" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">14.6 Place where records are kept</h3>
                  <p className="text-gray-600 mb-4">If the corporation is registered as:</p>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>a large corporation, the records that the corporation is required to keep under
                      <a href="#14.3">rule 14.3</a> and <a href="#14.4">rule 14.4</a> must be kept at the corporation&apos;s registered office, or</li>
                    <li>a small or medium corporation, the records that the corporation is required to
                      keep under <a href="#14.3">rule 14.3</a> and <a href="#14.4">rule 14.4</a> must be kept at the corporation&apos;s document
                      access address.</li>
                  </ul>
                </section>

                <section id="14.7" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">14.7 Right of access to corporation books by director or past director</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>A director may inspect the books of the corporation (other than its financial
                      records) for the purposes of a legal proceeding:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>to which that person is a party</li>
                        <li>which that person proposes in good faith to bring, or</li>
                        <li>which that person has reason to believe will be brought against him or her.</li>
                      </ul>
                    </li>
                    <li>A person who has ceased to be a director may inspect the books of the
                      corporation (including its financial records) for the purposes of a legal
                      proceeding:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>to which that person is a party</li>
                        <li>which that person proposes in good faith to bring, or</li>
                        <li>which that person has reason to believe will be brought against him or her.</li>
                        <li>This right continues for 7 years after the person ceased to be a director.</li>
                      </ul>
                    </li>
                    <li>A person authorised to inspect books under this <a href="#14.7">rule 14.7</a> for the purposes of a
                      legal proceeding may make copies of the books for the purposes of those
                      proceedings.</li>
                    <li>The corporation must allow a person to exercise the person&apos;s rights to inspect or
                      take copies of the books under this <a href="#14.7">rule 14.7</a>.</li>
                    <li>This <a href="#14.7">rule 14.7</a> does not limit any right of access to corporation books that a
                      person has apart from this <a href="#14.7">rule 14.7</a>.</li>
                  </ul>
                </section>

                <section id="14.8" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">14.8 Access to financial records by directors</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>A director has a right of access to the records that the corporation is required to
                      keep under <a href="#14.3">rule 14.3</a> or <a href="#14.4">rule 14.4</a>.</li>
                    <li>On application by a director, the court may authorise a person to inspect on the
                      director&apos;s behalf the records that the corporation is required to keep under <a href="#14.3">rule 14.3</a> or <a href="#14.4">rule 14.4</a> subject to any other orders the court considers appropriate.</li>
                    <li>A person authorised to inspect records under <a href="#14.8">rule 14.8(b)</a> may make copies of
                      the records unless the court orders otherwise.</li>
                  </ul>
                </section>

                <section id="14.9" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">14.9 Members&apos; access to minutes</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>If the corporation is registered as a large corporation, the corporation must make
                      available for inspection by members, at its registered office, the minute books for
                      the meetings of its members and for resolutions of members passed without
                      meetings. The books must be made available for inspection each business day
                      from at least 10 am to 12 noon and from at least 2 pm to 4 pm.</li>
                    <li>If the corporation is registered as a small or medium corporation, the corporation
                      must make available for inspection by members, at its document access
                      address, the minute books for the meetings of its members and for resolutions of
                      members passed without meetings. The books must be made available within 7
                      days of a member&apos;s written request for inspection.</li>
                    <li>The corporation must make minutes available free of charge.</li>
                    <li>A member may ask the corporation in writing for a copy of:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>any minutes of a meeting of the corporation&apos;s members or an extract of the
                          minutes or</li>
                        <li>any minutes of a resolution passed by members without a meeting.</li>
                      </ul>
                      <div className="bg-sky-50 border-l-4 border-sky-500 p-4 mt-4">
                        <p className="text-sky-900">
                          Note: The member may ask the corporation for an English translation under ss. 376
                          5(3) of the Act if the minutes are not in the English language.
                        </p>
                      </div>
                    </li>
                    <li>If the corporation does not require the member to pay for the copy, the
                      corporation must send it:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>within 14 days after the member asks for it or</li>
                        <li>within any longer period that the Registrar approves.</li>
                      </ul>
                    </li>
                    <li>If the corporation requires payment for the copy, the corporation must send it:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>within 14 days after the corporation receives the payment or</li>
                        <li>within any longer period that the Registrar approves.</li>
                      </ul>
                    </li>
                    <li>The amount of any payment the corporation requires cannot exceed 50 cents
                      per page.</li>
                  </ul>
                </section>

                <section id="14.10" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">14.10 Inspection of books by members</h3>
                  <p className="text-gray-600">
                    The directors, or the corporation by a resolution passed at a general meeting, may
                    authorise a member to inspect the books of the corporation.
                  </p>
                </section>

                <section id="14.11" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">14.11 Access to governance material</h3>

                  <section id="14.11.1" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">14.11.1 Corporation to provide member with rules, if requested.</h4>
                    <p className="text-gray-600 mb-4">
                      If a member asks for a copy of the corporation&apos;s rule book, the corporation
                      must provide it:
                    </p>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>free of charge and</li>
                      <li>within 7 days.</li>
                    </ul>
                  </section>

                  <section id="14.11.2" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">14.11.2 Registered office</h4>
                    <p className="text-gray-600">
                      If the corporation is registered as a large corporation, the corporation must
                      make available for inspection by members and officers at its registered
                      office, its rule book. This rule book must be available for inspection each
                      business day from at least 10 am to 12 noon and from at least 2 pm to 4
                      pm.
                    </p>
                  </section>

                  <section id="14.11.3" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">14.11.3 Document access address</h4>
                    <p className="text-gray-600">
                      If the corporation is registered as a small or medium corporation, the
                      corporation must make available for inspection by members and officers at
                      its document access address, its rule book. This rule book must be made
                      available for inspection within 7 days of a member&apos;s or officer&apos;s written
                      request for inspection.
                    </p>
                  </section>

                  <section id="14.11.4" className="scroll-mt-32 ml-4 mt-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">14.11.4 General provisions regarding access to rules</h4>
                    <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                      <li>The rule book of the corporation includes:
                        <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                          <li>the corporation&apos;s constitution</li>
                          <li>any replaceable rules that apply to the corporation</li>
                          <li>any other material concerning the internal governance of the
                            corporation that is prescribed.</li>
                        </ul>
                      </li>
                    </ul>
                  </section>
                </section>
              </section>

              {/* Section 15 - Auditor */}
              <section id="15" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">15. Auditor</h2>
                <p className="text-gray-600">
                  The corporation must comply with any requirements set out in the Act relating to the
                  examination or auditing of its financial records.
                </p>
              </section>

              {/* Section 16 - Annual reporting */}
              <section id="16" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">16. Annual reporting</h2>
                <p className="text-gray-600">
                  The corporation must comply with the annual reporting requirements set out in the Act.
                </p>
              </section>

              {/* Section 17 - Dispute resolution process */}
              <section id="17" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">17. Dispute resolution process</h2>

                <section id="17.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">17.1 General</h3>
                  <p className="text-gray-600 mb-4">
                    This rule sets out the steps which must be taken to try to resolve any disagreement or
                    dispute about the affairs of the corporation or how the Act or the corporation&apos;s
                    constitution applies, which arises between:
                  </p>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>members</li>
                    <li>members and directors, or</li>
                    <li>directors.</li>
                  </ul>
                </section>

                <section id="17.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">17.2 Informal negotiations</h3>
                  <p className="text-gray-600">
                    If a dispute arises, the parties must first try to resolve it themselves on an informal
                    basis.
                  </p>
                </section>

                <section id="17.3" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">17.3 Giving of dispute notice</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>If the dispute is not resolved in accordance with <a href="#17.2">rule 17.2</a> within 10 business
                      days, any party to the dispute may give a dispute notice to the other parties.</li>
                    <li>A dispute notice must be in writing, and must say what the dispute is about.</li>
                    <li>A copy of the notice must be given to the corporation.</li>
                  </ul>
                </section>

                <section id="17.4" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">17.4 Seeking assistance from the Registrar</h3>
                  <p className="text-gray-600 mb-4">
                    Seeking assistance from the Registrar about the meaning of the Act or the
                    corporation&apos;s rule book
                  </p>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>If a dispute or any part of a dispute relates to an issue arising out of the meaning
                      of any provision of the Act or the corporation&apos;s rule book, the directors or any
                      party to the dispute may seek an opinion from the Registrar about the correct
                      meaning of the relevant provision.</li>
                    <li>The Registrar&apos;s opinion will not be binding on the parties to a dispute.</li>
                  </ul>
                </section>

                <section id="17.5" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">17.5 Referring dispute to the directors</h3>
                  <p className="text-gray-600">
                    The directors must make a reasonable effort to help the parties resolve the dispute
                    within 20 business days after the corporation receives the dispute notice.
                  </p>
                </section>

                <section id="17.6" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">17.6 Referring dispute to a general meeting</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>If the directors cannot resolve the dispute within 20 business days after receiving
                      the dispute notice, it must hold a general meeting of the corporation and put the
                      matter to the members to resolve. The general meeting must be held within 3
                      months after the corporation receives dispute notice.</li>
                    <li>When passing any resolution about a dispute, the members in the general
                      meeting are subject to the Act and these rules.</li>
                  </ul>
                </section>
              </section>

              {/* Section 18 - Notices */}
              <section id="18" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">18. Notices</h2>

                <section id="18.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">18.1 General</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>Unless the Act or these rules otherwise requires, notices must be given in writing
                      (including by fax).</li>
                    <li>Notices of directors&apos; meetings given under <a href="#11.2">rule 11.2(b)</a> can be given in writing, by
                      email, by telephone or orally, if all the directors agree to notice being given in
                      that way.</li>
                  </ul>
                </section>

                <section id="18.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">18.2 How a notice to a member may be given</h3>
                  <p className="text-gray-600 mb-4">
                    Unless the Act or these rules require otherwise, a notice or communication may be
                    given:
                  </p>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>personally or by publication</li>
                    <li>left at a member&apos;s address as recorded in the register of members</li>
                    <li>sent by pre-paid ordinary mail to the member&apos;s address as recorded in the
                      register of members</li>
                    <li>sent by fax to the member&apos;s current fax number for notices (if the member has
                      nominated one)</li>
                    <li>sent by email to the member&apos;s current email address (if the member has
                      nominated one).</li>
                  </ul>
                </section>

                <section id="18.3" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">18.3 When notice taken as being given</h3>
                  <p className="text-gray-600 mb-4">
                    Unless the Act or these rules require otherwise, if a notice or communication:
                  </p>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>is given by post, it is taken to have been given 3 days after posting</li>
                    <li>is given by fax, it is taken to have been given on the business day after it is sent</li>
                    <li>is given:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>after 5:00 pm in the place of receipt or</li>
                        <li>on a day which is a Saturday, Sunday or bank or public holiday in the place
                          of receipt, it is taken as having been given at 9:00 am on the next day
                          which is not a Saturday, Sunday or public holiday in that place.</li>
                      </ul>
                    </li>
                  </ul>
                  <div className="bg-sky-50 border-l-4 border-sky-500 p-4 mt-4">
                    <p className="text-sky-900">
                      Note: it is taken as having been given at 9:00am on the next day which is not a
                      Saturday, Sunday or public holiday in that place.
                    </p>
                  </div>
                </section>
              </section>

              {/* Section 19 - Winding up */}
              <section id="19" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">19. Winding up</h2>

                <section id="19.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">19.1 Resolution to distribute surplus assets</h3>
                  <p className="text-gray-600 mb-4">Subject to rule 19.2, where:</p>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>the corporation is wound up</li>
                    <li>after all debts and liabilities have been taken care of, and costs of winding up
                      have been paid, surplus asset of the corporation exist, the members may pass a
                      special resolution relating to the distribution of the surplus assets of the
                      corporation.</li>
                  </ul>
                </section>

                <section id="19.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">19.2 No distribution of surplus asset to members</h3>
                  <p className="text-gray-600">
                    The distribution of surplus assets must not be made to any member or to any person
                    to be held on trust for any member.
                  </p>
                </section>

                <section id="19.3" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">19.3</h3>
                  <p className="text-gray-600">As soon as:</p>
                  <ul className="list-[decimal] ml-6 space-y-2 text-gray-600">
                    <li>The gift fund is wound up; or</li>
                    <li>the corporation&apos;s endorsement as a deductible gift recipient is revoked
                      under section 426-55 of the Taxation Administration Act 1953</li>
                    <li>any surplus assets of the gift fund must be transferred to another fund,
                      authority or institution, which has similar objectives to the corporation. This
                      body must also be able to receive tax deductible gifts under division 30 of
                      the Income Tax Assessment Act 1997.</li>
                  </ul>
                </section>
              </section>

              {/* Section 20 - Amendment of the constitution */}
              <section id="20" className="scroll-mt-32 mt-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">20. Amendment of the constitution</h2>

                <section id="20.1" className="scroll-mt-32 ml-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">20.1 Corporation wants to change this constitution</h3>
                  <p className="text-gray-600 mb-4">
                    For the corporation to change its constitution, the following steps must be complied
                    with:
                  </p>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>the corporation must pass a special resolution effecting the change</li>
                    <li>if, under the corporation&apos;s constitution, there are further steps that must also be
                      complied with to make a change, those steps must be complied with</li>
                    <li>the corporation must lodge certain documents under rule 20.2</li>
                    <li>the Registrar must make certain decisions in respect of the change and, if
                      appropriate, must register the change.</li>
                  </ul>
                </section>

                <section id="20.2" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">20.2 Corporation to lodge copy of changes</h3>
                  <ul className="list-[lower-alpha] ml-6 space-y-2 text-gray-600">
                    <li>If there is no extra requirement, within 28 days after the special resolution is
                      passed, the corporation must lodge with the Registrar:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>a copy of the special resolution</li>
                        <li>a copy of those parts of the minutes of the meeting that relate to the
                          passing of the special resolution</li>
                        <li>a directors&apos; statement signed by:
                          <ul className="list-[upper-alpha] ml-6 mt-2 space-y-2">
                            <li>2 directors or</li>
                            <li>if there is only 1 director, that director,</li>
                          </ul>
                          to the effect that the special resolution was passed in accordance with the
                          Act and the corporation&apos;s constitution, and
                        </li>
                        <li>a copy of the constitutional change.</li>
                      </ul>
                    </li>
                    <li>If a change is not to have effect until an extra requirement has been complied
                      with, the corporation must lodge:
                      <ul className="list-[lower-roman] ml-6 mt-2 space-y-2">
                        <li>the documents referred to in rule 20.2(a)</li>
                        <li>proof that the extra requirement has been met,</li>
                      </ul>
                      within 28 days after it has been met.
                    </li>
                    <li>If the Registrar directs the corporation to lodge a consolidated copy of the
                      corporation&apos;s constitution as it would be if the Registrar registered the change, it
                      must do so.</li>
                  </ul>
                </section>

                <section id="20.3" className="scroll-mt-32 ml-6 mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">20.3 Date of effect of change</h3>
                  <p className="text-gray-600">
                    A constitutional change under this rule 20 takes effect on the day the change is
                    registered.
                  </p>
                </section>
              </section>

<InterpretationDictionary />
              </div>
            </div>
          </div>
      </section>
    </>
  );
}
