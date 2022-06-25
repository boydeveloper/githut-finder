import PropTypes from 'prop-types';

function RepoList({ repos }) {
  repos.map((repo) => {
    return console.log(repo.name);
  });
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl y-4 font-bold card-title">
          Latest Repositories
        </h2>
        {repos.map((repo) => {
          console.log(repo.name);
          return <h3>{repo.name}</h3>;
        })}
      </div>
    </div>
  );
}

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
};
export default RepoList;
