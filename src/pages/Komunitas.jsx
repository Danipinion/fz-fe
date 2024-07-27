import { useEffect, useState } from "react";
import useSWR from "swr";
import instance from "../instance";

const Komunitas = () => {
  const getMessage = async () => {
    const response = await instance.get("/message");
    return response.data;
  };

  const { data: messages } = useSWR("message", getMessage);

  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await getMessage();
      setMessages(response);
    }, 1 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const postMessage = async () => {
    const response = await instance.post(
      "/message",
      "tolong buatkan artikel singkat 1 paragraf mengenai kenakalan remaja"
    );
    return response.data;
  };

  return (
    <>
      <div className="bg-blue-500 h-screen ">
        <h1 className="text-3xl font-bold py-5 text-center text-white">
          Komunitas
        </h1>
        <div className="w-full px-5 chat-container ">
          <div className="chat-messages h-[85vh] overflow-y-auto">
            {messages &&
              messages.map((message, index) => (
                <div className={`flex gap-2.5 flex-start`} key={index}>
                  <div>
                    <div className="grid mb-2">
                      <div
                        className={`px-3 py-2 bg-gray-100 text-black rounded-lg`}
                      >
                        <h2 className="text-sm font-normal leading-snug">
                          {message?.text}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {/*  CHAT END */}
        </div>
      </div>
    </>
  );
};

export default Komunitas;
