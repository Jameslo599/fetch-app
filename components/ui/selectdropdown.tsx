import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

interface SelectDropDownProps {
  options: (string | number)[];
  placeholder: string;
}

const SelectDropdown: React.FC<SelectDropDownProps> = ({
  options,
  placeholder,
}) => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem value={option.toString()} key={index}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectDropdown;
