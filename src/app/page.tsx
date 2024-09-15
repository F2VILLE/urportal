"use client";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
export default function Home() {
  const [notification, setNotification] = useState<string>("");
  const [notificationTimeout, setNotificationTimeout] =
    useState<NodeJS.Timeout>();

  const [links, setLinks] = useState<
    {
      url: string;
      name: string;
      image: string;
      imageCustomCSS?: CSSProperties;
    }[]
  >([]);

  useEffect(() => {
    fetch("/links.json")
      .then((res) => res.json())
      .then((data) => {
        setLinks(data);
      });
  }, []);
  return (
    <div className="flex flex-col justify-start items-center font-[family-name:var(--font-geist-sans)]">
      <header className="pt-8 mb-8 bg-gray-50 w-full flex flex-row justify-center items-end shadow-[inset_#0004_0_0_80px]">
        <Image src="/logo.svg" alt="logo" width={200} height={200} />
      </header>
      <section className="flex flex-col items-center justify-start">
        <p className="text-xl border-b-2 border-primary mb-4">Links</p>

        {links.map((link) => (
          <a
            key={link.url}
            className="flex flex-row justify-start items-center py-3 px-4 bg-primary text-white w-[280px] my-4 rounded-lg"
            href={link.url}
          >
            <Image 
            style={link.imageCustomCSS}
            src={link.image} alt="logo" width={40} height={40} />
            <p className="text-xl ml-4">{link.name}</p>
          </a>
        ))}
        <p className="text-xl border-b-2 border-primary mb-4 mt-8">IRC</p>
        <div className="w-[250px]">
          <p>
            Nous avons également un salon <b>IRC</b> (pour les connaisseurs)
          </p>
          <pre className="p-2 bg-gray-300 rounded-lg mt-4">
            <code>
              <p>
                Adresse:{" "}
                <b
                  className="flex flex-row justify-start items-center cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText("irc.libera.chat:6697");
                    setNotification("Copié !");
                    setNotificationTimeout(
                      setTimeout(() => {
                        setNotification("");
                      }, 2000)
                    );
                  }}
                >
                  irc.libera.chat:6697{" "}
                  <Image src="/copy.png" width={10} height={10} alt="Copy" />
                </b>
              </p>
              <br />
              <p>
                Salon:{" "}
                <b
                  className="flex flex-row justify-start items-center cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText("#UrLab");
                    setNotification("Copié !");
                    setNotificationTimeout(
                      setTimeout(() => {
                        setNotification("");
                      }, 2000)
                    );
                  }}
                >
                  #UrLab{" "}
                  <Image src="/copy.png" width={10} height={10} alt="Copy" />
                </b>
              </p>
            </code>
          </pre>
        </div>
      </section>
      <div className="pointer-events-none flex flex-row justify-center py-2 items-center bottom-0 left-0 right-0 absolute">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ translateY: 50, opacity: 0 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 50 }}
              className="bg-[#394] p-2 px-4 rounded-lg w-fit text-white"
            >
              <p>{notification}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
