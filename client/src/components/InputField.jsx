const InputField = ({ label, type = "text", placeholder }) => (
  <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3 w-full">
    <label className="flex flex-col flex-1 min-w-40">
      <p className="text-base font-medium pb-2 text-[#111418]">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        className="form-input rounded-xl border border-[#dbe0e6] h-14 p-[15px] text-base font-normal text-[#111418] bg-white placeholder-[#60748a] focus:border-[#dbe0e6] focus:outline-0 focus:ring-0"
      />
    </label>
  </div>
);

export default InputField;
