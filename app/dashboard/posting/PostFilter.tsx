import * as React from "react";
import * as Switch from '@radix-ui/react-switch';

interface PostFilterProps {
  onFilterChange: (checked: boolean) => void;
}

const PostFilter: React.FC<PostFilterProps> = ({ onFilterChange }) => {
  return (
    <form>
      <div className="flex items-center">
        <label
          className="pr-[15px] text-[15px] leading-none text-gray-700 font-semibold"
          htmlFor="my-posts"
        >
          My Postings
        </label>
        <Switch.Root
          className="relative h-[25px] w-[42px] cursor-default rounded-full bg-gray-300 shadow-[0_2px_10px] shadow-blackA4 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-blue-600"
          id="my-posts"
          onCheckedChange={onFilterChange}
        >
          <Switch.Thumb 
            className="block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" 
          />
        </Switch.Root>
      </div>
    </form>
  );
};

export default PostFilter;