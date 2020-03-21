const getTabProps = (index) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
  value: index,
});

export default getTabProps;
