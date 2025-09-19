import Image from "next/image";
import { fetchWorker, Worker } from "@/lib/api";
import {
  CaregivingCategory,
  Expectation,
  Infocard,
  WorkExperience,
} from "@/use-cases/types";
import type { Metadata } from "next";

import dynamic from "next/dynamic";

const Accordion = dynamic(() => import("@/components/AccordionClient"));
const InfoCard = dynamic(() => import("@/components/InfoCard"));
const SkillBadge = dynamic(() => import("@/components/SkillBadge"));

// Metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const worker = await fetchWorker(id);

    const imageUrl =
      worker.worker_overseas_detail_info?.eregistration_file ??
      new URL("/Frame 99.png", "http://localhost:3000").toString();

    return {
      metadataBase: new URL("http://localhost:3000"),
      title: `${worker.fullname ?? "Worker"} — Profile`,
      icons: {
        icon: [{ url: "/public/favicon.ico", type: "image/x-icon" }],
      },
      description: worker.about ?? "Worker profile",
      openGraph: {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${worker.fullname ?? "Worker"} profile image`,
          },
        ],
      },
    };
  } catch (err) {
    console.error("Failed to generate metadata:", err);
    return {
      metadataBase: new URL("http://localhost:3000"),
      title: "Worker Profile",
    };
  }
}

export default async function WorkerPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  let worker: Worker | null = null;
  try {
    worker = await fetchWorker(id);
  } catch (err) {
    console.error("Error fetching worker:", err);
  }

  // fallback if Failed
  if (!worker) {
    return (
      <main className="flex h-screen items-center justify-center">
        <p className="text-center text-red-500">Failed to load worker data.</p>
      </main>
    );
  }

  const workExperience: WorkExperience[] = [
    {
      icon: "/MM_work_experience.png",
      position: "Domestic Helper",
      location: "Hong Kong",
      period: {
        start: "June 2018",
        end: "June 2020",
      },
      details: {
        employerNationality: "Hong Kong",
        sizeOfHome: "500 Sq Ft",
        district: "Wanchai",
        householdSize: 4,
        languageSpoken: "Cantonese",
        reasonForLeaving: "Finished Contract",
      },
      mainDuties: [
        { icon: "/MM_child_care.png", name: "Child Care", year: "6-12" },
        { icon: "/MM_elderly_care.png", name: "Elderly Care", year: "6-12" },
        { icon: "/MM_cooking.png", name: "Cooking" },
        { icon: "/MM_household_chores.png", name: "General Housework" },
      ],
    },
    {
      icon: "/MM_overseas_experience.png",
      position: "Domestic Helper",
      location: "Taiwan",
      period: {
        start: "July 2016",
        end: "May 2018",
      },
      details: {
        employerNationality: "Hong Kong",
        sizeOfHome: "500 Sq Ft",
        district: "Wanchai",
        householdSize: 4,
        languageSpoken: "Cantonese",
        reasonForLeaving: "Terminated Contract (Pass Away)",
      },
      mainDuties: [
        {
          icon: "/MM_teen_care_teen care_150dpi.png",
          name: "Teen Care",
          year: "13-18",
        },
        { icon: "/MM_cooking.png", name: "Cooking" },
        { icon: "/MM_pet_care_pet care_150dpi.png", name: "Pet Care" },
      ],
    },
  ];

  const caregivingData: CaregivingCategory[] = [
    {
      category: "Baby Care",
      hasCaredFor: [
        "Newborn (0-1 year)",
        "Infant (1-3 years)",
        "Toddler (3-5 years)",
        "Child (5-12 years)",
        "Teen (13-19 years)",
      ],
      experiencedIn: [
        "Changing diapers",
        "Feeding",
        "Preparing food",
        "Sterilising bottles",
        "Night care for baby",
        "Night care for toddler / child",
        "Caring for child with Special Needs",
      ],
    },
    {
      category: "Elderly Care",
      hasCaredFor: ["75 yr old"],
      experiencedIn: [
        "Assisting with daily activities",
        "Medication management",
        "Monitoring health (e.g. blood pressure)",
        "Mobility assistance (e.g. wheelchair)",
        "Meal preparation",
        "Assisting with physical therapy",
        "Care for elderly with Special Needs",
      ],
    },
    {
      category: "Household Chores",
      hasCaredFor: [],
      experiencedIn: [
        "General cleaning",
        "Furniture care",
        "Washing machine",
        "Bed making",
        "Window cleaning",
        "Ironing",
        "Sewing",
        "Hand washing (clothes)",
        "Floor cleaning",
        "Vacuum cleaning",
      ],
    },
  ];

  const expectations: Expectation[] = [
    { label: "Take care of newborn baby", status: "check" },
    { label: "Willing to share room", status: "check" },
    { label: "Co-worker", status: "cross" },
    { label: "Saturday Off", status: "check" },
  ];

  const infoCards: Infocard[] = [
    {
      icon: "/Baby_Care.png",
      title: "Baby Care",
      subtitle: "AGE 0-1",
    },
    {
      icon: "/Toddler_Care.png",
      title: "Toddler Care",
      subtitle: "AGE 2-5",
    },
    {
      icon: "/MM_elderly_care.png",
      title: "Elderly Care",
      subtitle: "AGE 65+",
    },
    {
      icon: "/MM_cooking.png",
      title: "Cooking",
    },
    {
      icon: "/Gardening.png",
      title: "Gardening",
    },
    {
      icon: "/Driving.png",
      title: "Driving",
    },
  ];

  const imageUrl =
    worker.image ||
    worker.worker_overseas_detail_info?.eregistration_file ||
    "/Frame 99.png";

  return (
    <>
      {/*Title Image  */}
      <link rel="icon" href={imageUrl} type="image/png" sizes="32x32" />
      {/* Main Section */}
      <main>
        {/* Profile Image Display */}
        <div className="h-[11.25rem] pb-0.5">
          <img
            src={"/MM_Profile Bg.png"}
            className="w-full h-full object-cover"
            alt="background-Image"
          />
          <div className="relative rounded-full bg-white border border-[#EAEAEA] size-[8.125rem] -mt-26 mx-auto">
            <Image
              src={imageUrl}
              alt={`${worker.fullname} avatar`}
              fill
              sizes="auto"
              className="object-cover p-1.5 rounded-full"
            />
          </div>
        </div>

        {/* Name and Nationality Display */}
        <section className="px-8 mt-10">
          <div className="text-center">
            <p className="font-cooper text-black text-[1.75rem] leading-tight">
              {worker?.fullname || "N/A"}
            </p>
            <p className="text-secondary text-[16px] break-words leading-tight">
              {worker?.nationality?.id + ", " || ""}
              {worker?.nationality?.name_in || "N/A"}
            </p>
          </div>
        </section>

        {/* Info */}
        <section className="px-5 mt-7">
          <div className="flex items-center justify-center flex-wrap gap-6">
            <div className="flex-1 flex flex-col items-center text-center">
              <img
                src="/MM_work_experience.png"
                alt="Work_Experience"
                className="size-9"
              />
              <div className="mt-2.5">
                <p className="text-secondary text-sm">Experience</p>
                <p className="text-black text-base">10 Years</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center text-center">
              <img
                src="/MM_date_helper.png"
                alt="Calender"
                className="size-9"
              />
              <div className="mt-2.5">
                <p className="text-secondary text-sm">Can Start</p>
                <p className="text-black text-base">April 20</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center text-center">
              <img
                src="/MM_current_location.png"
                alt="Work_Experience"
                className="size-9"
              />
              <div className="mt-2.5">
                <p className="text-secondary text-sm">Location</p>
                <p className="text-black text-base">Hong Kong</p>
              </div>
            </div>
          </div>
        </section>

        {/* divider */}
        <div className="mx-5 my-5 border-b border-[#EAEAEA] border-dashed"></div>

        {/* Profile */}
        <section className="px-8">
          <h1 className="text-secondary text-xl">Profile</h1>
          <div className="mt-4 space-y-5">
            <div className="flex flex-wrap">
              <div className="flex-1 space-y-1">
                <p className="text-secondary font-medium text-[10px] leading-[10px]">
                  AGE
                </p>
                <p className="leading-[16px]">38</p>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-secondary font-medium text-[10px] leading-[10px]">
                  NATIONALITY
                </p>
                <p className="leading-[16px]">Filipino</p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="flex-1 space-y-1">
                <p className="text-secondary font-medium text-[10px] leading-[10px]">
                  HEIGHT
                </p>
                <p className="leading-[16px]">155cm</p>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-secondary font-medium text-[10px] leading-[10px]">
                  CHINESE HOROSCOPE
                </p>
                <p className="leading-[16px]">Dog</p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="flex-1 space-y-1">
                <p className="text-secondary font-medium text-[10px] leading-[10px]">
                  WEIGHT
                </p>
                <p className="leading-[16px]">47kg</p>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-secondary font-medium text-[10px] leading-[10px]">
                  HOROSCOPE
                </p>
                <p className="leading-[16px]">Libra</p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="flex-1 space-y-1">
                <p className="text-secondary font-medium text-[10px] leading-[10px]">
                  RELIGION
                </p>
                <p className="leading-[16px]">Christian</p>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-secondary font-medium text-[10px] leading-[10px]">
                  MARITAL STATUS
                </p>
                <p className="leading-[16px]">Married</p>
              </div>
            </div>
          </div>
        </section>

        {/* Family Background */}
        <section className="px-8 mt-10">
          <h1 className="text-secondary text-xl">Family Background</h1>
          <div className="mt-4">
            <div className="flex flex-wrap">
              <div className="flex-1">
                <p className="text-secondary font-medium text-[10px]">
                  NUMBER OF CHILDREN
                </p>
                <p>2</p>
              </div>
              <div className="flex-1">
                <p className="text-secondary font-medium text-[10px]">
                  AGE OF OLDEST CHILD
                </p>
                <p>15</p>
              </div>
            </div>
          </div>
        </section>

        {/* Education*/}
        <section className="px-8 mt-10">
          <h1 className="text-secondary text-xl">Education</h1>
          <div className="mt-4">
            <div className="flex items-start gap-2.5">
              {/* Icon */}
              <div className="flex-shrink-0 w-8 h-8">
                <img
                  src="/MM_minimum_education.png"
                  alt="Education"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text */}
              <div className="break-words">
                <p className="text-secondary font-medium text-[10px]">
                  EDUCATION LEVEL
                </p>
                <p>University of the Philippines, Los Banos Communications</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 mt-4">
              {/* Icon */}
              <div className="flex-shrink-0 w-8 h-8">
                <img
                  src="/MM_specialty_course.png"
                  alt="Education"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text */}
              <div className="break-words">
                <p className="text-secondary font-medium text-[10px]">
                  SPECIAL COURSEWORK
                </p>
                <p>Caregiving</p>
              </div>
            </div>
          </div>
        </section>

        {/* Language */}
        <section className="px-8 mt-10">
          <h1 className="text-secondary text-xl">Language</h1>
          <div className="mt-3">English, Cantonese</div>
        </section>

        {/* Main Skills */}
        <section className="px-8 mt-10">
          <h1 className="text-secondary text-xl">Main Skills</h1>
          <div className="grid grid-cols-3 gap-2.5 mt-4 auto-rows-fr">
            {infoCards.map((card, idx) => (
              <InfoCard
                key={idx}
                icon={card.icon}
                title={card.title}
                subtitle={card.subtitle}
              />
            ))}
          </div>
        </section>

        {/* Cooking */}
        <section className="px-8 mt-10">
          <h1 className="text-secondary text-xl">Cooking</h1>
          <div className="mt-3">Filipino Cuisine, Chinese Cuisine</div>
        </section>

        {/* Work Experience */}
        <section className="px-8 mt-10">
          <h1 className="text-secondary text-xl">Work Experience</h1>

          <div className="mt-4 space-y-10">
            {workExperience.map((exp, index) => (
              <div key={index} className="flex items-start gap-2.5">
                {/* Icon */}
                <div className="flex-shrink-0 w-8 h-8">
                  <img
                    src={exp?.icon}
                    alt="Experience"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Text */}
                <div>
                  {/* Position + Duration */}
                  <div className="break-words font-mabry font-medium">
                    <p>
                      {exp.position}, {exp.location}
                    </p>
                    <p className="text-secondary">
                      {exp.period.start} - {exp.period.end}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="mt-6 space-y-5">
                    <div className="grid grid-cols-12 gap-5">
                      {/* Left column */}
                      <div className="col-span-7 space-y-5">
                        <div className="space-y-1">
                          <p className="text-secondary font-medium text-[10px] leading-[10px]">
                            EMPLOYER NATIONALITY
                          </p>
                          <p className="leading-[16px]">
                            {exp.details.employerNationality}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-secondary font-medium text-[10px] leading-[10px]">
                            DISTRICT
                          </p>
                          <p className="leading-[16px]">
                            {exp.details.district}
                          </p>
                        </div>
                      </div>
                      {/* Right column */}
                      <div className="col-span-5 space-y-5">
                        <div className="space-y-1">
                          <p className="text-secondary font-medium text-[10px] leading-[10px]">
                            SIZE OF HOME
                          </p>
                          <p className="leading-[16px]">
                            {exp.details.sizeOfHome}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-secondary font-medium text-[10px] leading-[10px]">
                            HOUSEHOLD SIZE
                          </p>
                          <p className="leading-[16px]">
                            {exp.details.householdSize}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-secondary font-medium text-[10px] leading-[10px]">
                        LANGUAGE SPOKEN
                      </p>
                      <p className="leading-[16px]">
                        {exp.details.languageSpoken}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-secondary font-medium text-[10px] leading-[10px]">
                        REASON FOR LEAVING
                      </p>
                      <p className="leading-[16px]">
                        {exp.details.reasonForLeaving}
                      </p>
                    </div>

                    {/* Duties */}
                    <div className="mt-6">
                      <p className="text-secondary font-medium text-[10px] leading-[10px]">
                        MAIN DUTIES
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {exp.mainDuties.map((duty, index) => (
                          <SkillBadge
                            key={index}
                            icon={duty?.icon}
                            label={duty?.name}
                            subLabel={duty?.year}
                            large={index === 0}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expectations */}
        <section className="px-8 mt-10">
          <h1 className="text-secondary text-xl">Expectations</h1>
          <div className="mt-4 space-y-2">
            {expectations.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <p>{item.label}</p>
                {item.status === "check" ? (
                  <Image
                    src="/MM_check_mark_150dpi.png"
                    alt="Check Mark"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    src="/MM_iconography_Close.png"
                    alt="Cross Mark"
                    width={24}
                    height={24}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Expanded Profile */}
        <section className="px-8 mt-10">
          <h1 className="text-secondary text-xl">Expanded Profile</h1>

          <div className="space-y-4 mt-4">
            {caregivingData.map((section, index) => (
              <Accordion
                key={index}
                title={section.category}
                defaultOpen={true}
              >
                <div className="space-y-3 pt-3">
                  {/* Has Cared For */}
                  {section.hasCaredFor.length > 0 && (
                    <div>
                      <p className="text-secondary font-bold pb-1 text-[10px] leading-[20px] tracking-[0.33px]">
                        HAS CARED FOR
                      </p>
                      <ul className="leading-[24px]">
                        {section.hasCaredFor.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Experienced In */}
                  {section.experiencedIn.length > 0 && (
                    <div>
                      <p className="text-secondary font-bold pb-1 text-[10px] leading-[20px] tracking-[0.33px]">
                        EXPERIENCED IN
                      </p>
                      <ul className="leading-[24px]">
                        {section.experiencedIn.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Accordion>
            ))}
          </div>
          <p className="mt-5">Reference Letter Available</p>
        </section>

        {/* Button */}
        <div className="px-8 my-10">
          <button
            className="bg-[#009AFA] text-white py-3 px-6 font-medium leading-[1px] rounded-full flex items-center justify-center cursor-pointer w-full font-cooper"
            type="button"
          >
            <span>
              <img src="/Star1.png" alt="Star" className="h-4" />
            </span>
            I'm Interested
          </button>
        </div>
      </main>
    </>
  );
}
