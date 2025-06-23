import { capitalized } from "@/shared/lib";
import s from "./RoleAndPlanBlock.module.scss";
import { useUsersStore } from "@/shared/stores/users";

export default function RoleAndPlanBlock() {
    const { currentUser } = useUsersStore();
    const {accountInfoState} = useUsersStore();
    const { role, plan } = currentUser!;
    return (
        <p className={s.roleInfo} style={accountInfoState.usernameIsEditting ? {marginTop: "-1.5px"} : {}}>
            {capitalized(role.toString())} ་{" "}
            {capitalized(plan.toString()) + " plan"}
        </p>
    );
}