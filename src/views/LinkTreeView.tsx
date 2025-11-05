import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { social } from "../data/social";
import { DevTreeInput } from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { updateProfile } from "../api/DevTreeAPI";
import { TSocialNetwork, TUser } from "../types";

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: TUser = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Actualizado Correctamente");
    },
    onError: () => {},
  });

  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: TSocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });

    setDevTreeLinks(updatedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === name ? { ...link, url: value } : link
    );

    setDevTreeLinks(updatedLinks);

    queryClient.setQueryData(["user"], (prevData: TUser) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks),
      };
    });
  };

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no válida");
        }
      }
      return link;
    });

    setDevTreeLinks(updatedLinks);

    queryClient.setQueryData(["user"], (prevData: TUser) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedLinks),
      };
    });
  };

  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button
        onClick={() => mutate(user)}
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
      >
        Guardar cambios
      </button>
    </div>
  );
};

export default LinkTreeView;
