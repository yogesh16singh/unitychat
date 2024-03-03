import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

const SetupPage = async () => {
  console.log('setup page')
  const profile = await initialProfile();
  if(profile=="nouser") {
    return <div>No User</div>;
  }
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <div>Create a Server</div>;
}

export default SetupPage;