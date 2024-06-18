import eyeIcon from "@iconify/icons-lucide/eye";
import fileSpreadsheetIcon from "@iconify/icons-lucide/file-spreadsheet";
import fileTextIcon from "@iconify/icons-lucide/file-text";
import fileUpIcon from "@iconify/icons-lucide/file-up";
import folderIcon from "@iconify/icons-lucide/folder";
import folderGit2Icon from "@iconify/icons-lucide/folder-git-2";
import folderUpIcon from "@iconify/icons-lucide/folder-up";
import globeIcon from "@iconify/icons-lucide/globe";
import grid2X2Icon from "@iconify/icons-lucide/grid-2x2";
import listIcon from "@iconify/icons-lucide/list";
import plusIcon from "@iconify/icons-lucide/plus";
import searchIcon from "@iconify/icons-lucide/search";
import shieldIcon from "@iconify/icons-lucide/shield";

import { useEffect, useState } from "react";

import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Join,
  Select,
  SelectOption,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@/components/daisyui";

import Icon from "@/components/Icon";
import DateUtil from "@/helpers/utils/date";
import { StringUtil } from "@/helpers/utils/string";
import { IFileManagerFile } from "@/types/file-manager";
import { FileData } from "../../../../declarations/may16-galaxy-backend/may16-galaxy-backend.did";

export const LoadingFileRow = ({ file, ...props }: { file: FilePlaceholder; checkedAll?: boolean }) => {
  return (
    <>
      <TableRow className="cursor-pointer hover:bg-base-200/40 animate-pulse"
        role="status"
        {...props}
      >
        <Checkbox
          size={"xs"}
          checked={false}
          disabled
        />
        <div className="flex items-center space-x-3 truncate">
          <div className={`rounded bg-base-content/5 p-1.5 text-base-content/80`}>
            <Icon icon={fileTextIcon} fontSize={20} />
          </div>
          <div>{file.name}</div>
        </div>
        <div className="text-sm font-medium w-6"></div>
        <div>
          <div className="text-sm w-2"></div>
        </div>
        <div className="text-sm w-2"></div>
        <div className="w-4"></div>
        <div className="w-2">
        </div>
        <div>
          <Button color="ghost" size="sm" shape={"square"} aria-label="Show file" disabled>
            <Icon icon={eyeIcon} className="text-base-content/70" fontSize={16} />
          </Button>
        </div>
        <div></div>
      </TableRow>
    </>
  );
};

export const StorageFileRow = ({ file, ...props }: { file: FileData; checkedAll?: boolean }) => {
  const shared_with = "private";
  
  return (
    <>
      <TableRow className="cursor-pointer hover:bg-base-200/40"
        _="on click set ut to first <input[type='checkbox']/> in me then toggle @checked on ut then ut.click()"
        {...props}
      >
        <Checkbox
          _="on click halt the event's bubbling"
          size={"xs"}
          checked={false}
          aria-label="Single check"
        />
        <div className="flex items-center space-x-3 truncate">
          <div className={`rounded bg-base-content/5 p-1.5 text-base-content/80`}>
            <Icon icon={fileTextIcon} fontSize={20} />
          </div>
          <div>{file.name}</div>
        </div>
        <div className="text-sm font-medium">{file.collection}</div>
        <div className="text-sm font-medium">{file.owner}</div>
        <div>
          <div className="text-sm">{StringUtil.convertToStorageUnits(file.size)}</div>
        </div>
        <div className="text-sm">{DateUtil.formatted(file.uploadedAt)}</div>
        <div>
          {shared_with === "private" ? (
            <span className="flex items-center gap-2 text-error">
              <Icon icon={shieldIcon} fontSize={15} />
              Private
            </span>
          ) : shared_with === "public" ? (
            <span className="flex items-center gap-2 text-success">
              <Icon icon={globeIcon} fontSize={15} />
              Public
            </span>
          ) : (
            <span className="text-base-content/60">{shared_with} members</span>
          )}
        </div>
        <div>
          <Button color="ghost" size="sm" shape={"square"} aria-label="Show file" _={`on click go to url "/__fs__/${file.fileId}" in new window`}>
            <Icon icon={eyeIcon} className="text-base-content/70" fontSize={16} />
          </Button>
        </div>
        <div></div>
      </TableRow>
    </>
  );
};

export type FilePlaceholder = {
  // id: string;
  name: string;
};

export const FilesTableBody = ({ storageFiles, ...props }: { storageFiles: (FileData|FilePlaceholder)[] }) => {
  return <TableBody id="Files" {...props}>
      {storageFiles.map((file, index) => {
        if ('size' in file && file.size > 0) {
          return <StorageFileRow file={file} key={index} />
        }
        return <LoadingFileRow file={file} key={index} hx-get={`/fileInfo/${file.name}`} hx-target="outerHTML" hx-trigger="load" />
      }
      )}
    </TableBody>
}

export const FilesTable = () => {
  return <Table className="mt-2 rounded-box">
    <TableHead>
      <Checkbox
        _="
                                    on click  
           set value to ((<#Files input[type='checkbox']:not(:checked)/>).length == 0)
           repeat in <#Files input[type='checkbox']/>
             set it.checked to value
             it.click() 
           end
                                "
        size={"xs"}
        aria-label="Check all"
      />
      <span className="text-sm font-medium text-base-content/80">Name</span>
      <span className="text-sm font-medium text-base-content/80">Collection</span>
      <span className="text-sm font-medium text-base-content/80">Owner</span>
      <span className="text-sm font-medium text-base-content/80">Size</span>
      <span className="text-sm font-medium text-base-content/80">Created At</span>
      <span className="text-sm font-medium text-base-content/80">Shared With</span>
      <span className="text-sm font-medium text-base-content/80">View</span>
    </TableHead>

    <FilesTableBody storageFiles={[]} hx-get="/myFileIds" hx-trigger="load" hx-swap="outerHTML" />
  </Table>
}

const AllFiles = () => {
  return (
    <Card className="bg-base-100">
      <CardBody className={"p-0"}>
        <div className="flex items-center justify-between gap-3 px-5 pt-5">
          <div className="inline-flex items-center gap-3">
            <Button disabled color="ghost" size="sm" className="hidden border-base-content/20 sm:flex" _="
                                
                            ">
              <Icon icon={folderGit2Icon} fontSize={16} />
              <span id="Transclude">Transclude(<strong><span _="on change from <#Files input[type='checkbox']/> or load
                    put (<#Files input[type='checkbox']:checked/>).length into me"></span></strong> files)</span>
            </Button>
          </div>

          <div className="inline-flex items-center gap-3">
            <div className="form-control flex flex-row items-center rounded-box border border-base-content/20 px-2">
              <Icon icon={searchIcon} className="text-base-content/60" fontSize={15} />
              <Input
                size="sm"
                placeholder="Search along files"
                className="w-full focus:border-transparent focus:outline-0"
                bordered={false}
                borderOffset={false}></Input>
            </div>
          </div>
        </div>
        <div className="overflow-auto">
          <FilesTable storageFiles={[]} />
        </div>
      </CardBody>
    </Card>
  );
};

export default AllFiles;
