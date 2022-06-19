import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Label, List } from 'semantic-ui-react';
import NewSubCategoryNode, { CategoryNameInput } from './NewSubCategoryNode';
import AppActions from '../redux/app';

const NodeComp = ({
  categoryDetail,
  treeId,
  subNodes,
  nodesMap,
  isLoader,
  isLoaderObj,
  updateSubCategoryName,
  deleteCategory,
  getSubCategories,
}) => {
  const [isDisplaySubNewNode, setIsDisplaySubNewNode] = useState(false);
  const [isDisplayEditCategoryInput, setIsDisplayEditCategoryInput] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const isHaveChild = categoryDetail.childCount > 0;

  const toggleExpand = () => {
    if (!isExpand && !subNodes) {
      getSubCategories(treeId, categoryDetail.id);
    }
    setIsExpand(!isExpand);
  };
  return (
    <List.Item>
      <List.Icon onClick={() => toggleExpand()} name={isHaveChild && `caret ${isExpand ? 'down' : 'right'}`} />
      {isLoader ? <div><Icon loading name="spinner" /></div>
        : (
          <List.Icon name={isHaveChild ? 'folder' : 'globe'}>
            {isHaveChild && (
            <Label circular size="mini" color="red">
              {categoryDetail.childCount}
            </Label>
            )}
          </List.Icon>
        )}
      <List.Content>
        <List.Header>
          {isDisplayEditCategoryInput
            ? (
              <CategoryNameInput
                defaultValue={categoryDetail.name}
                actionSubmit={(v) => {
                  updateSubCategoryName(
                    treeId,
                    categoryDetail.parent,
                    categoryDetail.id,
                    v,
                  );
                  setIsDisplayEditCategoryInput(false);
                }}
              />
            )
            : categoryDetail.name}
          <List.Icon className="icon-action" name="pencil alternate" size="small" onClick={() => setIsDisplayEditCategoryInput(!isDisplayEditCategoryInput)} />
          <List.Icon className="icon-action" name="plus" onClick={() => setIsDisplaySubNewNode(true)} color="blue" size="small" />
          <List.Icon className="icon-action" name="trash" color="red" size="small" onClick={() => deleteCategory(treeId, categoryDetail.parent, categoryDetail.id)} />
        </List.Header>
        <List.List>
          {isExpand && subNodes && subNodes.length > 0
          && subNodes.map(({ name, parent, id, childCount }) => (
            <NodeComp
              key={id}
              treeId={treeId}
              categoryDetail={{ name, parent, id, childCount }}
              subNodes={nodesMap && nodesMap[id]}
              isLoader={isLoaderObj && isLoaderObj[id]}
              nodesMap={nodesMap}
              isLoaderObj={isLoaderObj}
              updateSubCategoryName={updateSubCategoryName}
              deleteCategory={deleteCategory}
              getSubCategories={getSubCategories}
            />
          ))}
          {isDisplaySubNewNode
          && (
          <NewSubCategoryNode
            parentId={categoryDetail.id}
            treeId={treeId}
            cancelAction={() => setIsDisplaySubNewNode(false)}
            isLoader={isLoaderObj && isLoaderObj[`${categoryDetail.id}_new`]}
            toggleParentNode={toggleExpand}
            isParentOpen={isExpand}
          />
          )}
        </List.List>
      </List.Content>
    </List.Item>
  );
};

export default connect(() => ({}),
  {
    updateSubCategoryName: AppActions.updateSubCategoryName,
    deleteCategory: AppActions.deleteCategory,
    getSubCategories: AppActions.getSubCategories,
  })(NodeComp);
