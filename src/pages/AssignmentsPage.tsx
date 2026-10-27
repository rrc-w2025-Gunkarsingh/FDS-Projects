import AssignmentForm from "../components/assignments/AssignmentForm";

import AssignmentList from "../components/assignments/AssignmentList";

/*
  AssignmentsPage displays the assignment form and list.

  Both components use the custom assignment hook.

  Assignment data is shared without prop drilling.
*/

export default function AssignmentsPage() {
  return (
    <main>
      <h1>Assignments</h1>

      <p>
        Manage your assignments and keep track of upcoming work.
      </p>

      <AssignmentForm />

      <AssignmentList />
    </main>
  );
}