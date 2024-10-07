import getIcon from "@/components/type-icon/icons";

type TypeIconProps = {
  name: string;
};

export default function TypeIcon({ name }: TypeIconProps) {
  return getIcon(name).icon;
}
