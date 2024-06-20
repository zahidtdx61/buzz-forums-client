import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Announcements from "../../components/Announcements/Announcements";
import Loader from "../../components/Loader/Loader";
import Tags from "../../components/Tags/Tags";
import useAnnouncement from "../../hooks/useAnnouncement";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const Home = () => {
  const [tag, setTag] = useState(null);
  const axios = useAxiosCommon();
  const { allAnnouncement, announcementLoading } = useAnnouncement();

  const { data: allTags, isLoading: tagsLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get("/user/tags");
      // console.log(response.data.data);
      return response?.data?.data;
    },
  });

  if (announcementLoading) {
    return (
      <div>
        <Helmet>
          <title>Buzz Forums | Home</title>
        </Helmet>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Buzz Forums | Home</title>
      </Helmet>
      <div className="min-h-[calc(100vh-80px)] mx-auto w-full mt-12 p-2">
        <Tags
          tag={tag}
          setTag={setTag}
          allTags={allTags}
          tagsLoading={tagsLoading}
        />

        {allAnnouncement?.length && <Announcements announcements={allAnnouncement} />}
      </div>
    </>
  );
};

export default Home;
