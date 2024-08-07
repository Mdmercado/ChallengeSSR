import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Spinner size="xl" aria-label="Loading..." />
    </div>
  );
};

export default Loading;
