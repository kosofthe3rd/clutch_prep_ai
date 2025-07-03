import React from 'react'
import Agent from "@/components/ui/Agent";
import {getCurrentUser} from "@/lib/actions/auth.action";

const Page = async () => {
    const user = await getCurrentUser();
    return (
        <Agent userName={user?.name} userId={user?.id}  type="generate"/>
    )
}
export default Page
