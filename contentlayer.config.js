import { makeSource } from "contentlayer/source-files";
import {
  Articles,
  Releases,
  Tutorials,
} from "./lib/ContentlayersDocumentTypes";

export default makeSource({
  contentDirPath: "blog",
  documentTypes: [Articles, Releases, Tutorials],
});
