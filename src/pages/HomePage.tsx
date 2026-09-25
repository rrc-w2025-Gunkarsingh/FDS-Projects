import type { Dispatch, SetStateAction } from "react";
import StudyOverview from "../components/study-overview/StudyOverview";
import type { Assignment } from "../types/assignment";

type HomePageProps = {
  assignments: Assignment[];
  setAssignments: Dispatch<SetStateAction<Assignment[]>>;
};

function HomePage({ assignments }: HomePageProps) {
  return (
    <>
      <StudyOverview />
      <p>Total assignments: {assignments.length}</p>
    </>
  );
}

export default HomePage;