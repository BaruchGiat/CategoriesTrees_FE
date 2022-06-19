/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Icon, Segment } from 'semantic-ui-react';
import treesActions, { treesSelectors } from '../redux/app/trees';
import Tree from './Tree';

function Home({ treesList, getAllTrees, addNewTree, isAddTreeLoading }) {
  const [newTreeTabOpen, setNewTreeTabOpen] = useState(false);
  const [activeTree, setActiveTree] = useState();
  const [currentTree, setCurrentTree] = useState();
  const [newTreeName, setNewTreeName] = useState();
  useEffect(() => {
    getAllTrees();
  }, [getAllTrees]);
  useEffect(() => {
    if (!activeTree) {
      setActiveTree(treesList[0]);
      setCurrentTree(treesList[0]);
    }
  }, [setActiveTree, activeTree, treesList]);
  useEffect(() => {
    if (!isAddTreeLoading) {
      const index = treesList.length - 1;
      setActiveTree(treesList[index]);
      setCurrentTree(treesList[index]);
      setNewTreeTabOpen(false);
      setNewTreeName(false);
    }
  }, [isAddTreeLoading, treesList]);
  return (
    <>
      <div>
        <Segment attached="top" className="tree-segment">
          {currentTree && <Tree treeId={currentTree.id} treeName={currentTree.name} />}
        </Segment>

        <div className="ui bottom attached tabular menu">
          {treesList.map((tree) => (
            <MenuTab
              key={tree.id}
              onClick={() => { setActiveTree(tree); setCurrentTree(tree); }}
              isActive={activeTree && tree.id === activeTree.id}
              name={tree.name}
              icon="tree"
            />
          ))}

          {newTreeTabOpen
            && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              className="item tree-name-tab"
            >

              <Icon
                onClick={() => {
                  setNewTreeTabOpen(false);
                  setNewTreeName(false);
                }}
                name="remove"
                color="red"
                disabled={isAddTreeLoading}
              />
              {newTreeName && (
              <Icon
                onClick={() => addNewTree(newTreeName)}
                loading={isAddTreeLoading}
                color="green"
                name={isAddTreeLoading ? 'spinner' : 'check'}
              />
              )}
              <input
                placeholder="Tree Name"
                type="text"
                className="input-tree-name"
                onChange={(e) => setNewTreeName(e.target.value)}
                onKeyDown={(e) => (e.key === 'Enter' && newTreeName ? addNewTree(newTreeName) : null)}
              />
            </a>
            )}
          <div className="right menu">
            <MenuTab
              name="Add Tree dsafsd"
              onClick={() => setNewTreeTabOpen(true)}
              icon="add"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default connect((state) => ({
  treesList: treesSelectors.treesList(state),
  isAddTreeLoading: treesSelectors.isLoading('addNewTree', state),
}),
{
  getAllTrees: treesActions.getAllTrees,
  addNewTree: treesActions.addNewTree,
})(Home);

const MenuTab = ({ onClick, isActive, name, icon }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    onClick={onClick}
    className={`item tree-name-tab ${isActive ? 'active' : ''}`}
  >
    <i aria-hidden="true" className={`${icon} icon`} />
    {name}
  </a>
);
