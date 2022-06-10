import { Drawer, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import { DrawerSelectList } from './DrawerSelectList';

const drawerWidth = 240;

const useStyles = makeStyles({
  page: {
    background: '#f9f9f9',
    width: '100%'
  },
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth
  },
  root: {
    display: 'flex'
  },
  list: {
    listStyleType: 'none'
  }

})

const Sidebar = () => {

  const classes = useStyles();

  return (
    <>
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor="left"
      classes={{paper: classes.drawerPaper}}
      >
      <div className='d-flex'>
        {/* <ul className={classes.list}>
          <Typography variant='h5' component='li'>Dashboard</Typography>
          <Typography variant='h5' component='li'>Items</Typography>
          <Typography variant='h5' component='li'>Sidebar</Typography>
        </ul> */}
      </div>
        <DrawerSelectList />
    </Drawer>

    </>
  )
}

export default Sidebar