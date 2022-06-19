import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Icon, List } from 'semantic-ui-react';
import AppActions, { appSelectors } from '../redux/app';

const NewSubCategoryNode = ({
  parentId, cancelAction, isLoader, addSubCategory, treeId,
  toggleParentNode, newSubCategorySuccess, isParentOpen,
}) => {
  const [subCategoryName, SetSubCategoryName] = useState();
  const addSubCategoryAction = (name) => {
    addSubCategory(treeId, parentId, name);
    SetSubCategoryName(name);
  };
  useEffect(() => {
    if (subCategoryName && newSubCategorySuccess[treeId]
         && newSubCategorySuccess[treeId][parentId] === subCategoryName) {
      if (!isParentOpen && toggleParentNode) toggleParentNode(parentId);
      cancelAction();
    }
  }, [isLoader, newSubCategorySuccess,
    toggleParentNode, cancelAction, isParentOpen, parentId, subCategoryName, treeId]);
  return (
    <List.Item>
      <Icon.Group>
        {!isLoader ? (
          <>
            <Icon name="folder" color="grey" />
            <Icon corner name="add" color="grey" />
          </>
        ) : <Icon loading name="spinner" />}
      </Icon.Group>
      <List.Content>
        <List.Header>
          <CategoryNameInput
            actionSubmit={addSubCategoryAction}
          />
          <List.Icon name="trash" onClick={cancelAction} color="red" size="small" />
        </List.Header>
      </List.Content>
    </List.Item>
  );
};

export const CategoryNameInput = ({ defaultValue = '', actionSubmit }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <input
      placeholder="Category Name"
      onChange={(e) => setValue(e.target.value)}
      type="text"
      value={value}
      className="input-category-name"
      onKeyDown={(e) => (e.key === 'Enter' ? actionSubmit(value) : null)}
      onBlur={() => value && actionSubmit(value)}
    />
  );
};

export default connect((state) => ({
  isLoaderObj: appSelectors.isLoaderObj(state),
  newSubCategorySuccess: appSelectors.newSubCategorySuccess(state),
}),
{
  addSubCategory: AppActions.addSubCategory,
})(NewSubCategoryNode);
