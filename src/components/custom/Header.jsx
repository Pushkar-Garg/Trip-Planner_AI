import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { googleLogout } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        // console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });


  return (
    
    <div className="p-2 w-screen shadow-sm flex justify-between items-center px-4 bg-gray-200">
      <img src="/logo.svg" className="w-45" alt="hello" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
          <a href="/create-trip">
              <Button variant="ghost" className="rounded-full">
                + Create Trip
              </Button>
            </a>
            <a href="/my-trip">
              <Button variant="ghost" className="rounded-full">
                My trip
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={"/userLogo.png"} className="h-[50px] w-[50px] rounded-4xl" />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button variant="ghost" onClick={() => setOpenDialog(true)}>
            Sign In
          </Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication Securely</p>

              <Button
                onClick={login}
                variant="ghost"
                className="w-full mt-5 flex gap-4 items-center"
              >
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
