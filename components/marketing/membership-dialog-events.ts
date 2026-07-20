export const MEMBERSHIP_DIALOG_OPEN_EVENT = "aslm:open-membership-dialog";

export function openMembershipDialog() {
  window.dispatchEvent(new CustomEvent(MEMBERSHIP_DIALOG_OPEN_EVENT));
}
