'use client';


const SECTIONS = [
    {
        label: "Crisis Text Line",
        description: "Text RELATE to 741741 from anywhere in the US"
    },
    {
        label: "Davis Suicide Prevention and Crisis Line",
        description: "Call 530-756-5000",
    },
    {
        label: "Student Health and Counseling Services",
        description: [
            "Medical and Mental Health - Call 530-752-2300 (After hours Counseling Services consultation call 530-752-2349).", 
            "Mental Health Acute Care Services - Available at the Student Health and Wellness Center (SHCS) by appointment.",
            "Online video counseling - Student Health and Counseling Services.",
            "CAN Counselors - Consultation and personal counseling in addition to programs, workshops and other campus community outreach activities.",
            "Therapy Assistance Online (TAO) - Free online therapy for UC Davis students.",
            "Aggie Mental Health - Aggie Mental Health (formerly known as Each Aggie Matters) is the campus website for all mental wellness resources. Visit this site to access resources for mental wellness, join a supportive campus community and participate in an open and affirming dialogue about mental health. Check out the Mental Health Map on their homepage."
        ]
    }
]

export default function Resources() {

  return (
    <>
      <div className="flex w-full flex-col text-left">
        <div className="h-screen w-[95%] border-accent border-[2px] border-b-0 rounded-tl-[50px] rounded-tr-[50px] pl-16 pt-12 pr-16">
            {
                SECTIONS.map((section, i) => {

                    return(
                        <div key={i} className="text-accent mt-[12pt] first-of-type:mt-0">
                            <h1 className="text-[24pt] lowercase font-bold border-white">
                                {section.label}
                            </h1>
                            {
                                Array.isArray(section.description) &&
                                section.description.map((descriptionLine) => (
                                    <div className="text-[12pt] lowercase font-light">
                                        {descriptionLine}
                                    </div>
                                ))
                            }
                            {
                                !Array.isArray(section.description) &&
                                <div className="text-[12pt] lowercase font-light">
                                    {section.description}
                                </div>
                            }
                        </div>
                    )
                })
            }
        </div>
      </div>
    </>
  )
}

