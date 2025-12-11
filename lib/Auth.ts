import { stackServerApp } from "@/stack/server";
import { redirect } from 'next/navigation'

export async function getCurrentUser(){

    // get Data Of Signed User
    const user= await stackServerApp.getUser();

    if (!user)
    {
        redirect('/sign-in')
    }

    return user;
}