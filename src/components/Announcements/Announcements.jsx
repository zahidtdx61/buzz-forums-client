import PropTypes from "prop-types";

const Announcements = ({ announcements }) => {
  return (
    <div className="w-[95%] lg:max-w-screen-lg mx-auto my-12 ">
      <div className="mx-auto flex flex-col gap-2">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="bg-zinc-100 p-4 rounded border-l-4 border-slate-600"
          >
            <h1 className="text-xl font-semibold text-slate-800">
              {announcement.title}
            </h1>
            <p className="text-slate-600 mt-2">{announcement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Announcements.propTypes = {
  announcements: PropTypes.array,
};

export default Announcements;
