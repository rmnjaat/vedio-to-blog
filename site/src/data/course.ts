// The course: ten lectures, in course order. A lecture without an MDX file shows as "in preparation".
export const COURSE = {
  title: 'System design',
  subtitle: 'Ten lectures from a live cohort class, worked through on one running case: building Medium.',
};
export const LECTURES = Array.from({ length: 10 }, (_, i) => ({
  number: i + 1,
  id: `lec${String(i + 1).padStart(2, '0')}`,
}));
export const pad = (n: number) => String(n).padStart(2, '0');
