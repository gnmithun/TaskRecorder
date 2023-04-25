const dbController = require("../Database/DBController")

exports.createTasksViewForTenants = async (sessionId) => {
    await dbController.query(" DROP VIEW if exists tasksviews; ")
    await dbController.query(" CREATE VIEW `tasksviews` AS SELECT `tasks`.`id` AS `id`, `tasks`.`detail` AS `detail`, `tasks`.categoryId AS `categoryId`, `tasks`.`completed` AS `completed`, `tasks`.`priority` AS `priority`,`tasks`.`createdAt` AS `createdAt`, `tasks`.`updatedAt` AS `updatedAt` FROM `tasks` WHERE (`tasks`.`userId` = :userId)",{
       replacements : { userId : sessionId }
   })
  }