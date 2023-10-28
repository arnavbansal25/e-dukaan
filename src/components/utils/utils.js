export const styles = {
  label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
  button:
    "bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
};

const combinations = [
  { color: "#00539C", text: "#EEA47F" },
  { color: "#2F3C7E", text: "#2F3C7E" },
  { color: "#101820", text: "#FEE715" },
  { color: "#F96167", text: "#F9E795" },
  { color: "#CCF381", text: "#4831D4" },
  { color: "#E2D1F9", text: "#317773" },
  { color: "#990011", text: "#FCF6F5" },
  { color: "#8AAAE5", text: "#FFFFFF" },
  { color: "#ADD8E6", text: "#00008B" },
  { color: "#2BAE66", text: "#FCF6F5" },
];
export const generateRandomAvatar = () =>
  combinations[Math.floor(Math.random() * 10)];
