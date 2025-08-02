import React from 'react';

const MessageTabs = () => {
  return (
    <div className="pb-3">
      <div className="flex border-b border-[#dce0e5] px-4 gap-8">
        <a className="flex flex-col items-center justify-center border-b-[3px] border-b-[#111418] text-[#111418] pb-[13px] pt-4" href="#">
          <p className="text-sm font-bold tracking-[0.015em]">All</p>
        </a>
        <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#637488] pb-[13px] pt-4" href="#">
          <p className="text-sm font-bold tracking-[0.015em]">Direct Messages</p>
        </a>
        <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#637488] pb-[13px] pt-4" href="#">
          <p className="text-sm font-bold tracking-[0.015em]">Channels</p>
        </a>
      </div>
    </div>
  );
};

export default MessageTabs;
