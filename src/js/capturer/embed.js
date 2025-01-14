import T      from '../lib/tool.js';
import Task   from '../lib/task.js';
import CaptureTool from './tool.js';


/*!
 * Capture SnapshotNode Embed
 *
 * @param {SnapshotNode} node
 * @param {Object} params
 *   - {String} baseUrl
 *   - {String} clipId
 *   - {Object} storageInfo
 *   - {RequestParams} requestParams
 *   - {Object} config
 *
 */
async function capture(node, params) {
  const {config} = params;
  switch(config.htmlCaptureEmbed) {
    case 'saveImage':
      return await captureFilter(node, {params, filterText: '<images>'});
    case 'remove':
      return CaptureTool.captureRemoveNode();
    case 'saveAll':
      return await captureSaveAll(node, params);
    case 'filter':
    default:
      return await captureFilter(node, {params,
        filterText: params.config.htmlEmbedFilter});
  }
}


async function captureSaveAll(node, params) {
  const resourceType = Task.getResourceType(node.attr.src, node.attr.type);
  const attrParams = {resourceType, attrName: 'src', mimeTypeAttrName: 'type'};
  return await CaptureTool.captureAttrResource(node, params, attrParams);
}


async function captureFilter(node, {params, filterText}) {
  if (CaptureTool.isFilterMatch(filterText, node.attr.src, node.attr.type)) {
    return await captureSaveAll(node, params);
  } else {
    return CaptureTool.captureRemoveNode();
  }
}


export default {capture};
