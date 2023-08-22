import React from "react";

type Props = {};

const RightSidebar = (props: Props) => {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-mediumt text-light-1">
          Suggested Communities
        </h3>
      </div>
    </section>
  );
};

export default RightSidebar;
