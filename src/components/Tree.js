import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon, List } from 'semantic-ui-react';
import AppActions, { appSelectors } from '../redux/app';
import NewSubCategoryNode from './NewSubCategoryNode';
import NodeComp from './NodeComp';

function Tree({ getSubCategories, nodesMap, isLoaderObj, treeId, treeName }) {
  const [isAddNewCategoryOpen, setIsAddNewCategoryOpen] = useState(false);
  const isTreeLoading = isLoaderObj[treeId];
  const categoryChildArr = nodesMap[treeId] && nodesMap[treeId][treeId];
  useEffect(() => { getSubCategories(treeId, treeId); }, [treeId, getSubCategories]);
  return (
    <>
      <List className="tree-list">
        <List.Item>
          <List.Icon disabled name="caret down" />
          {isTreeLoading ? <div><Icon loading name="spinner" /></div>
            : <List.Icon name="sitemap" />}
          <List.Content>
            <List.Header>
              {treeName}
              <List.Icon className="icon-action" name="plus" onClick={() => setIsAddNewCategoryOpen(true)} color="blue" size="small" />
            </List.Header>
            <List.List>
              {categoryChildArr && categoryChildArr.length > 0
                && categoryChildArr.map(({ name, parent, id, childCount }) => (
                  <NodeComp
                    key={id}
                    treeId={treeId}
                    categoryDetail={{ name, parent, id, childCount }}
                    subNodes={nodesMap && nodesMap[treeId][id]}
                    isLoader={isLoaderObj && isLoaderObj[id]}
                    nodesMap={nodesMap[treeId]}
                    isLoaderObj={isLoaderObj}
                  />
                ))}
              {isAddNewCategoryOpen
          && (
          <NewSubCategoryNode
            parentId={treeId}
            treeId={treeId}
            cancelAction={() => setIsAddNewCategoryOpen(false)}
            isLoader={isLoaderObj && isLoaderObj[`${treeId}_new`]}
          />
          )}
            </List.List>
          </List.Content>
        </List.Item>
      </List>
    </>
  );
}

export default connect((state) => ({
  nodesMap: appSelectors.nodesMap(state),
  isLoaderObj: appSelectors.isLoaderObj(state),
}),
{
  getSubCategories: AppActions.getSubCategories,
})(Tree);
