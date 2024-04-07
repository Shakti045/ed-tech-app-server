import { User } from './user.js';
import { Course } from './course.js';
import { Enrollment } from './enrollment.js';
import { Section } from './section.js';
import { Subsection } from './susbsection.js';
import { Profile } from './profile.js';
import { RatingReview } from './ratingreview.js';
import { Category } from './category.js';



export const defineRelations = ()=>{
  User.hasOne(Profile,{as:'profile',foreignKey:'userId',onDelete:'CASCADE'});
  Profile.belongsTo(User,{as:'user',foreignKey:'userId',onDelete:'CASCADE'});

  Course.belongsToMany(User,{through:Enrollment,as:'enrolledstudents',foreignKey:'courseId',onDelete:'CASCADE'});
  User.belongsToMany(Course,{through:Enrollment,as:'enrolledcourses',foreignKey:'enrolledstudentId',onDelete:'CASCADE'});
  Course.belongsTo(User,{as:'creator',foreignKey:'creatorId',onDelete:'CASCADE'});

  Course.hasMany(Section,{as:'relatedsections',foreignKey:'relatedcourseId',onDelete:'CASCADE'});
  Section.belongsTo(Course,{as:'belongstocourse',foreignKey:'relatedcourseId',onDelete:'CASCADE'});
  Section.hasMany(Subsection,{as:'relatedsubsections',foreignKey:'relatedsectionId',onDelete:'CASCADE'});
  Subsection.belongsTo(Section,{as:'belongstosection',foreignKey:'relatedsectionId',onDelete:'CASCADE'});

  User.hasMany(RatingReview,{as:'ratingreviews',foreignKey:'userId',onDelete:'CASCADE'});
  Course.hasMany(RatingReview,{as:'ratingreviews',foreignKey:'courseId',onDelete:'CASCADE'});
  RatingReview.belongsTo(User,{as:'user',foreignKey:'userId',onDelete:'CASCADE'});
  RatingReview.belongsTo(Course,{as:'course',foreignKey:'courseId',onDelete:'CASCADE'});

  Course.belongsTo(Category,{as:'category',foreignKey:'belongstocategory',onDelete:'CASCADE'});
  Category.hasMany(Course,{as:'courses',foreignKey:'belongstocategory',onDelete:'CASCADE'});

  console.log("Relations defined successfully")
}

